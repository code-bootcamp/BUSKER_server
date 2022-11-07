import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FilesService {
  async uploadFiles({ files }) {
    // 파일을 클라우드 스토리지에 저장
    const waitedFiles = await Promise.all(files);

    // storage 셋팅
    const bucket = 'busket-storage';
    const storage = new Storage({
      projectId: process.env.ELASTICSEARCH_PROJECT_ID,
      keyFilename: process.env.ELASTICSEARCH_KEY_FILE_NAME,
    }).bucket(bucket);

    // 스토리지에 파일 올리기
    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream().pipe(
              storage
                .file(el.filename)
                .createWriteStream()
                .on('finish', () => resolve(`${bucket}/${el.filename}`))
                .on('error', () => reject('실패')),
            );
          }),
      ),
    );
    // 다운로드 URL 브라우저 전송
    return results;
  }

  async uploadFile({ file }) {
    // 파일을 클라우드 스토리지에 저장
    const waitedFile = await Promise.all(file);

    // storage 셋팅
    const bucket = 'busket-storage';
    const storage = new Storage({
      projectId: process.env.ELASTICSEARCH_PROJECT_ID,
      keyFilename: process.env.ELASTICSEARCH_KEY_FILE_NAME,
    }).bucket(bucket);

    // 스토리지에 파일 올리기
    const result = await Promise.all(
      waitedFile.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream().pipe(
              storage
                .file(el.filename)
                .createWriteStream()
                .on('finish', () => resolve(`${bucket}/${el.filename}`))
                .on('error', () => reject('실패')),
            );
          }),
      ),
    );
    // 다운로드 URL 브라우저 전송
    return result;
  }
}
