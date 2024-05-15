// merge.js

import PDFMerger from 'pdf-merger-js';

const mergePdfs = async (p1, p2) => {
  const merger = new PDFMerger(); // Create a new instance of PDFMerger
  
  try {
    await merger.add(p1);
    await merger.add(p2);
    
    const timestamp = new Date().getTime();
    const filename = `merged_${timestamp}.pdf`;
  
    await merger.save(`public/${filename}`);

    return `/static/${filename}`; // Return the URL of the merged PDF
  } catch (error) {
    throw new Error('Error merging PDFs: ' + error.message);
  }
};

export { mergePdfs };
