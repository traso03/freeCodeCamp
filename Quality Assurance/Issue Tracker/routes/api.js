'use strict';
const mongoose = require('mongoose');

module.exports = function (app) {
  const issueSchema = new mongoose.Schema(
    {
      project: {
        type: String,
        required: [true, 'Please provide a projectname'],
        maxlength: 50,
      },
      issue_title: {
        type: String,
        required: [true, 'Please provide a title'],
        maxlength: 30,
      },
      issue_text: {
        type: String,
        required: [true, 'Please provide an issue text'],
        maxlength: 200,
      },
      created_by: {
        type: String,
        required: [true, 'Please provide name of issuer'],
        maxlength: 24,
      },
      assigned_to: {
        type: String,
        maxlength: 24,
        default: '',
      },
      status_text: {
        type: String,
        maxlength: 24,
        default: '',
      },
      open: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );

  const Issue = mongoose.model('Issue', issueSchema);

  app
    .route('/api/issues/:project')

    .get(async function (req, res) {
      let project = req.params.project;
      let issues = await Issue.find({ project: project, ...req.query }).exec();

      if (!issues) {
        throw new NotFoundError(`No project called ${project} found`);
      }

      var resp = issues.map((d) => ({
        _id: d._id,
        issue_title: d.issue_title,
        issue_text: d.issue_text,
        created_on: d.createdAt,
        updated_on: d.updatedAt,
        created_by: d.created_by,
        assigned_to: d.assigned_to,
        open: d.open,
        status_text: d.status_text,
      }));

      res.json(resp);
    })

    .post(async function (req, res) {
      let project = req.params.project;
      let { issue_title, issue_text, created_by, assigned_to, status_text } =
        req.body;

      if (
        !issue_title ||
        issue_title == '' ||
        !issue_text ||
        issue_text == '' ||
        !created_by ||
        created_by == ''
      ) {
        res.json({ error: 'required field(s) missing' });
        return;
      }

      const myIssue = new Issue({
        project: project,
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        assigned_to: assigned_to,
        status_text: status_text,
      });

      let savedIssue = await Issue.create(myIssue);

      var resp = {
        _id: savedIssue._id,
        issue_title: savedIssue.issue_title,
        issue_text: savedIssue.issue_text,
        created_on: savedIssue.createdAt,
        updated_on: savedIssue.updatedAt,
        created_by: savedIssue.created_by,
        assigned_to: savedIssue.assigned_to,
        open: savedIssue.open,
        status_text: savedIssue.status_text,
      };

      res.json(resp);
    })

    .put(async function (req, res) {
      let project = req.params.project;
      let {
        _id,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
      } = req.body;

      if (!_id) {
        res.json({ error: 'missing _id' });
        return;
      }

      if (
        (!issue_title || issue_title == '') &&
        (!issue_text || issue_text == '') &&
        (!created_by || created_by == '') &&
        (!assigned_to || assigned_to == '') &&
        (!status_text || status_text == '')
      ) {
        res.json({ error: 'no update field(s) sent', _id: _id });
        return;
      }

      try {
        var cleanBody = Object.keys(req.body)
          .filter((k) => req.body[k] !== '')
          .reduce((a, k) => ({ ...a, [k]: req.body[k] }), {});
        const issue = await Issue.findByIdAndUpdate(
          { _id: _id },
          { $set: cleanBody },
          { new: true, runValidators: true }
        );

        if (!issue) {
          throw new Exception();
        }
      } catch {
        res.json({ error: 'could not update', _id: _id });
        return;
      }

      res.json({ result: 'successfully updated', _id: _id });
    })

    .delete(async function (req, res) {
      const { _id } = req.body;

      if (!_id) {
        res.json({ error: 'missing _id' });
        return;
      }
      try {
        const issue = await Issue.findOneAndDelete({ _id: _id });

        if (!issue) {
          throw new Exception();
        }
        res.json({ result: 'successfully deleted', _id: _id });
        return;
      } catch {
        res.json({ error: 'could not delete', _id: _id });
        return;
      }
    });
};
