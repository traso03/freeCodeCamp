const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  let translator = new Translator();

  suite('American to British', function () {
    test('Translate Mangoes are my favorite fruit. to British English', function (done) {
      const strText = 'Mangoes are my favorite fruit.';
      const strLocale = 'american-to-british';
      const strTranslation = 'Mangoes are my favourite fruit.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate I ate yogurt for breakfast. to British English', function (done) {
      const strText = 'I ate yogurt for breakfast.';
      const strLocale = 'american-to-british';
      const strTranslation = 'I ate yoghurt for breakfast.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test("Translate We had a party at my friend's condo. to British English", function (done) {
      const strText = "We had a party at my friend's condo.";
      const strLocale = 'american-to-british';
      const strTranslation = "We had a party at my friend's flat.";
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate Can you toss this in the trashcan for me? to British English', function (done) {
      const strText = 'Can you toss this in the trashcan for me?';
      const strLocale = 'american-to-british';
      const strTranslation = 'Can you toss this in the bin for me?';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate The parking lot was full. to British English', function (done) {
      const strText = 'The parking lot was full.';
      const strLocale = 'american-to-british';
      const strTranslation = 'The car park was full.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate Like a high tech Rube Goldberg machine. to British English', function (done) {
      const strText = 'Like a high tech Rube Goldberg machine.';
      const strLocale = 'american-to-british';
      const strTranslation = 'Like a high tech Heath Robinson device.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate To play hooky means to skip class or work. to British English', function (done) {
      const strText = 'To play hooky means to skip class or work.';
      const strLocale = 'american-to-british';
      const strTranslation = 'To bunk off means to skip class or work.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate No Mr. Bond, I expect you to die. to British English', function (done) {
      const strText = 'No Mr. Bond, I expect you to die.';
      const strLocale = 'american-to-british';
      const strTranslation = 'No Mr Bond, I expect you to die.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate Dr. Grosh will see you now. to British English', function (done) {
      const strText = 'Dr. Grosh will see you now.';
      const strLocale = 'american-to-british';
      const strTranslation = 'Dr Grosh will see you now.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate Lunch is at 12:15 today. to British English', function (done) {
      const strText = 'Lunch is at 12:15 today.';
      const strLocale = 'american-to-british';
      const strTranslation = 'Lunch is at 12.15 today.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });
  });

  suite('British to American', function () {
    test('Translate We watched the footie match for a while. to American English', function (done) {
      const strText = 'We watched the footie match for a while.';
      const strLocale = 'british-to-american';
      const strTranslation = 'We watched the soccer match for a while.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate Paracetamol takes up to an hour to work. to American English', function (done) {
      const strText = 'Paracetamol takes up to an hour to work.';
      const strLocale = 'british-to-american';
      const strTranslation = 'Tylenol takes up to an hour to work.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate First, caramelise the onions. to American English', function (done) {
      const strText = 'First, caramelise the onions.';
      const strLocale = 'british-to-american';
      const strTranslation = 'First, caramelize the onions.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate I spent the bank holiday at the funfair. to American English', function (done) {
      const strText = 'I spent the bank holiday at the funfair.';
      const strLocale = 'british-to-american';
      const strTranslation = 'I spent the public holiday at the carnival.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate I had a bicky then went to the chippy. to American English', function (done) {
      const strText = 'I had a bicky then went to the chippy.';
      const strLocale = 'british-to-american';
      const strTranslation =
        'I had a cookie then went to the fish-and-chip shop.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test("Translate I've just got bits and bobs in my bum bag. to American English", function (done) {
      const strText = "I've just got bits and bobs in my bum bag.";
      const strLocale = 'british-to-american';
      const strTranslation = "I've just got odds and ends in my fanny pack.";
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate The car boot sale at Boxted Airfield was called off. to American English', function (done) {
      const strText = 'The car boot sale at Boxted Airfield was called off.';
      const strLocale = 'british-to-american';
      const strTranslation = 'The swap meet at Boxted Airfield was called off.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate Have you met Mrs Kalyani? to American English', function (done) {
      const strText = 'Have you met Mrs Kalyani?';
      const strLocale = 'british-to-american';
      const strTranslation = 'Have you met Mrs. Kalyani?';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test("Translate Prof Joyner of King's College, London. to American English", function (done) {
      const strText = "Prof Joyner of King's College, London.";
      const strLocale = 'british-to-american';
      const strTranslation = "Prof. Joyner of King's College, London.";
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Translate Tea time is usually around 4 or 4.30. to American English', function (done) {
      const strText = 'Tea time is usually around 4 or 4.30.';
      const strLocale = 'british-to-american';
      const strTranslation = 'Tea time is usually around 4 or 4:30.';
      assert.equal(
        translator.translate(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });
  });

  suite('American to British with highlighted text', function () {
    test('Highlight translation in Mangoes are my favorite fruit.', function (done) {
      const strText = 'Mangoes are my favorite fruit.';
      const strLocale = 'american-to-british';
      const strTranslation =
        'Mangoes are my <span class="highlight">favourite</span> fruit.';
      assert.equal(
        translator.translateAndHighlight(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Highlight translation in I ate yogurt for breakfast.', function (done) {
      const strText = 'I ate yogurt for breakfast.';
      const strLocale = 'american-to-british';
      const strTranslation =
        'I ate <span class="highlight">yoghurt</span> for breakfast.';
      assert.equal(
        translator.translateAndHighlight(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });
  });

  suite('British to American with highlighted text', function () {
    test('Highlight translation in We watched the footie match for a while.', function (done) {
      const strText = 'We watched the footie match for a while.';
      const strLocale = 'british-to-american';
      const strTranslation =
        'We watched the <span class="highlight">soccer</span> match for a while.';
      assert.equal(
        translator.translateAndHighlight(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });

    test('Highlight translation in Paracetamol takes up to an hour to work.', function (done) {
      const strText = 'Paracetamol takes up to an hour to work.';
      const strLocale = 'british-to-american';
      const strTranslation =
        '<span class="highlight">Tylenol</span> takes up to an hour to work.';
      assert.equal(
        translator.translateAndHighlight(strText, strLocale),
        strTranslation,
        '"' + strText + '" should translate to "' + strTranslation + '"'
      );
      done();
    });
  });
});
