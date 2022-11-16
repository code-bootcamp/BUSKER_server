import { FilesService } from './files.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  // 여러개 파일
  @Mutation(() => [String])
  uploadFiles(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[], // graphql과 typescript 두개 다 데이터 타입 지정
  ) {
    // 주소를 보내주기 때문에 Mutation의 return type이 string으로 지정.
    return this.filesService.uploadFiles({ files });
  }

  // 한개의 파일
  @Mutation(() => String)
  uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return this.filesService.uploadFile({ file });
  }

  // 유저이미지 업로드
  // @Mutation(() => String)
  // async userImageUpload(
  //   @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload, //
  // ) {
  //   return await this.filesService.userImage({ file });
  // }
}
