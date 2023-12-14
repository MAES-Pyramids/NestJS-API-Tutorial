import {
   ForbiddenException,
   Injectable,
   NotFoundException,
} from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
   constructor(private prisma: PrismaService) {}

   private async findBookmark(userId: number, bookmarkId: number) {
      const bookmark = await this.prisma.bookmark.findUnique({
         where: {
            id: bookmarkId,
         },
      });
      if (!bookmark) {
         throw new NotFoundException('Bookmark not found');
      }
      if (bookmark.userId !== userId) {
         throw new ForbiddenException('Access to resource denied');
      }
      return bookmark;
   }

   async getBookmarks(userId: number) {
      const bookmarks = await this.prisma.bookmark.findMany({
         where: {
            userId,
         },
      });
      return bookmarks;
   }

   async createBookmark(userId: number, dto: CreateBookmarkDto) {
      const bookmark = await this.prisma.bookmark.create({
         data: {
            userId,
            ...dto,
         },
      });
      return bookmark;
   }

   async getBookmarkById(userId: number, bookmarkId: number) {
      const bookmark = await this.findBookmark(userId, bookmarkId);
      return bookmark;
   }

   async editBookmark(
      userId: number,
      bookmarkId: number,
      dto: EditBookmarkDto,
   ) {
      const bookmark = await this.findBookmark(userId, bookmarkId);
      const updatedBookmark = await this.prisma.bookmark.update({
         where: { id: bookmark.id },
         data: {
            ...dto,
         },
      });
      return updatedBookmark;
   }

   async deleteBookmark(userId: number, bookmarkId: number) {
      const bookmark = await this.findBookmark(userId, bookmarkId);
      await this.prisma.bookmark.delete({
         where: {
            id: bookmark.id,
         },
      });
   }
}
