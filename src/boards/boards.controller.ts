import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board-dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) { }

    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardService.getAllBoards();
    // }

    @Get('/')
    getAllBoard(): Promise<Board[]> {
        return this.boardService.getAllBoards();
    }
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardService.createBoard(createBoardDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.createBoard(CreateBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardService.getBoardById(id);
    // }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoard(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
        return this.boardService.updateBoardStatus(id, status);
    }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     return this.boardService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoard(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ) {
    //     return this.boardService.updateBoardStatus(id, status);
    // }
}
