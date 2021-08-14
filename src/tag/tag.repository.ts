import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Post } from 'src/posts/posts.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './tag.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  public async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const { name } = createTagDto;
    const tag: Tag = this.create({ name });
    return await this.save(tag);
  }

  public async getAllTags(): Promise<Tag[]> {
    return await this.find();
  }

  public async updateTag(
    id: string,
    updateTagDto: UpdateTagDto,
  ): Promise<void> {
    const { name } = updateTagDto;
    await this.update({ id }, { name });
  }

  public async deleteTag(id: string, user: User): Promise<void> {
    // checking user is admin or NOT
    // if(user.role !== 'admin') return permission Error
    const result: DeleteResult = await this.delete({ id });
    if (result.affected) {
      throw new NotFoundException(`tag with '${id} is not found.`);
    }
  }
}