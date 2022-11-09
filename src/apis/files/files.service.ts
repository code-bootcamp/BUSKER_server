import { FileUpload } from 'graphql-upload';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 } from 'uuid';

interface IUpload {
  file: FileUpload;
}

@Injectable()
export class FilesService {
  async uploadFiles({ files }) {
    // 파일을 클라우드 스토리지에 저장
    const waitedFiles = await Promise.all(files);

    // storage 셋팅
    const bucket = process.env.ELASTICSEARCH_BUCKET;
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

  async uploadFile({ file }: IUpload) {
    // storage 셋팅
    const bucket = process.env.ELASTICSEARCH_BUCKET;

    const storage = new Storage({
      projectId: process.env.ELASTICSEARCH_PROJECT_ID,
      keyFilename: process.env.ELASTICSEARCH_KEY_FILE_NAME,
    }).bucket(bucket);

    const fileType = file.mimetype.split('/')[0];
    if (fileType !== 'image')
      throw new UnprocessableEntityException('it is not an image file');

    // 스토리지에 파일 올리기
    const result: string = await new Promise((resolve, reject) => {
      const uuid = v4();
      const fileType = file.filename.split('.').pop();

      file
        .createReadStream()
        .pipe(storage.file(`${uuid}.${fileType}`).createWriteStream())
        .on('finish', () => resolve(`${bucket}/${uuid}.${fileType}`))
        .on('error', (error) => reject(error));
    });

    return result;
  }
}
