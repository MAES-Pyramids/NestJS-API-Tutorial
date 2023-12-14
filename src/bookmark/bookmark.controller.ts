import {
   Body,
   Controller,
   Delete,
   Get,
   HttpCode,
   HttpStatus,
   Param,
   ParseIntPipe,
   Patch,
   Post,
   UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
   @Get()
   getBookmarks(@GetUser('id') userId: number) {}

   @Post()
   createBookmark(
      @GetUser('id') userId: number,
      @Body() dto: CreateBookmarkDto,
   ) {}

   @Get(':id')
   getBookmarkById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) bookmarkId: number,
   ) {}

   @Patch(':id')
   editBookmark(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) bookmarkId: number,
      @Body() dto: EditBookmarkDto,
   ) {}

   @HttpCode(HttpStatus.NO_CONTENT)
   @Delete(':id')
   deleteBookmark(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) bookmarkId: number,
   ) {}
}
