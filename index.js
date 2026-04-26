// import path from "path";
// import fs, { createReadStream, createWriteStream } from "fs";
// import { Duplex, Transform } from "stream";

// const readFile = async () => {
//   try {
//     const inputFilePath = path.join(process.cwd(), "input.txt");
//     const outputFilePath = path.join(process.cwd(), "output.txt");

//     // created read and write streams
//     const readable = fs.createReadStream(inputFilePath, "utf-8");
//     const writable = fs.createWriteStream(outputFilePath);

//     const transform = new Transform({
//       transform(chunks, enc, cb) {
//         const updatedData = chunks.toString().toUpperCase();
//         cb(null, updatedData);
//       },
//     });

//     await readable
//       .pipe(transform)
//       .pipe(writable)
//       .on("finish", () => {
//         console.log("finished updating file data");
//       });
//     // combine both in duplex
//   } catch (error) {
//     console.log(error);
//   }
// };

// readFile();

console.log("index file called my boy");
