'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  const translator = new Translator();

  app.route('/api/translate').post((req, res) => {
    let text = req.body.text;
    let locale = req.body.locale;
    if (text == undefined || locale == undefined) {
      return res.status(200).json({ error: 'Required field(s) missing' });
    }
    if (text == '') {
      return res.status(200).json({ error: 'No text to translate' });
    }
    if (locale != 'american-to-british' && locale != 'british-to-american') {
      return res.status(200).json({ error: 'Invalid value for locale field' });
    }

    let strTranslated = translator.translateAndHighlight(text, locale);

    if (strTranslated === text) {
      return res.status(200).json({
        text: text,
        translation: 'Everything looks good to me!',
      });
    }
    return res.status(200).json({
      text: text,
      translation: strTranslated,
    });
  });
};
