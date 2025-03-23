// const fs = require('fs');
// const path = require('path');
// const { getDocument } = require('pdfjs-dist/legacy/build/pdf');

// /**
//  * Extracts text from a given PDF file.
//  * @param {string} pdfPath - The path of the PDF file.
//  * @returns {Promise<string>} Extracted text from the PDF.
//  */
// async function extractTextFromPDF(pdfPath) {
//     if (!fs.existsSync(pdfPath)) {
//         throw new Error(`❌ PDF file does not exist: ${pdfPath}`);
//     }

//     let dataBuffer = fs.readFileSync(pdfPath);
//     let uint8Array = new Uint8Array(dataBuffer);
//     let pdfDoc = await getDocument({ data: uint8Array }).promise;
//     let extractedText = '';

//     for (let i = 1; i <= pdfDoc.numPages; i++) {
//         let page = await pdfDoc.getPage(i);
//         let textContent = await page.getTextContent();
//         extractedText += textContent.items.map(item => item.str).join(' ') + '\n';
//     }

//     return extractedText;
// }

// /**
//  * Verifies that a downloaded PDF contains multiple expected strings.
//  * @param {Array<string>} expectedTexts - List of strings to verify in the PDF.
//  * @param {string} pdfPath - The path of the downloaded PDF.
//  */
// async function verifyDownloadedPDF(expectedTexts, pdfPath) {
//     console.log(`🔍 Verifying PDF: ${pdfPath}`);

//     let pdfText = await extractTextFromPDF(pdfPath);

//     expectedTexts.forEach(text => {
//         if (!pdfText.includes(text)) {
//             throw new Error(`❌ Expected text "${text}" NOT found in PDF!`);
//         }
//         console.log(`✅ Verified text: "${text}"`);
//     });

//     console.log('🎉 All expected texts found in PDF!');
// }

// module.exports = { verifyDownloadedPDF };
