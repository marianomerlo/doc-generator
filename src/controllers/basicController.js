const expressify = require('expressify');
const docx = require('docx');

// TODO: This module provides an example of a controller. Replace it with your actual controller/s
module.exports = function basicController(
  operaService
) {
  return expressify({
    post
  });

  // ---

  /**
   * It performs a get.
   *
   * @returns {Promise}
   */
  function post(req, res) {
    const elections = req.body.elections.split(',');

    const operas = operaService.getOperas();

    // Create document
    const doc = new docx.Document();

    elections.forEach((e) => {
      const opera = operas[e - 1];
      // Add some content in the document
      const title = new docx.Paragraph(opera.title).title().center();
      // Add more text into the paragraph if you wish
      const description = new docx.Paragraph(opera.description).heading1().left();
      doc.addParagraph(title);
      doc.addParagraph(description);
    });


    // Or use the express packer to make the file downloadable.
    // res is express' Response object
    const exporter = new docx.ExpressPacker(doc, res);

    exporter.pack('My First Document');

    // done! A file called 'My First Document.docx'
    // will be in your file system if you used LocalPacker
    // Or it will start downloading if you are using Express

    return res;
  };
};
