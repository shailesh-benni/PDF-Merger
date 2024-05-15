import express from 'express';
import path from 'path';
import multer from 'multer';
import { mergePdfs } from './merge.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const upload = multer({ dest: 'uploads/' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' directory
app.use('/static', express.static(path.join(__dirname, 'public'), { 'extensions': ['css'] }));

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"));
});

app.post('/merge', upload.array('pdf', 5), async function (req, res, next) {
    console.log(req.files);
    try {
        const mergedPdfUrl = await mergePdfs(
            path.join(__dirname, req.files[0].path),
            path.join(__dirname, req.files[1].path)
        );
        res.redirect(mergedPdfUrl);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error merging PDFs');
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
