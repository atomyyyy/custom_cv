import fs from 'fs';
import path from 'path';
import express from 'express';
import stream from 'stream';

import PdfGenerator from './PdfGenerator';

(async() => {
  const app = express();
  await PdfGenerator.init();

  app.get('/', async (req, res) => {
    const html = fs.readFileSync(path.resolve(__dirname, '..', 'public', 'index.html'));
    const pdf = await PdfGenerator.generatePdf(html.toString());

    const bufferStream = new stream.PassThrough();
    bufferStream.end(pdf);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    bufferStream.pipe(res);
  });
  
  app.listen(3000, function(){ console.log('Listening on 3000') });
})()