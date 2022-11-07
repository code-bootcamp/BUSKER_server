import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comment.service';
import { CreateCommentInput } from './dto/createComment.input';
import { Comments } from './entity/comments.entity';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentService: CommentsService) {}
  @Mutation(() => Comments)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput, //
  ) {
    return await this.commentService.create({ createCommentInput });
  }
  @Query(() => Comments)
  fetchComment() {
    return this.commentService.findAll();
  }

  @Mutation(() => Boolean)
  async deleteComment(@Args('commentId') commentId: string) {
    return await this.commentService.delete({ commentId });
  }
}
