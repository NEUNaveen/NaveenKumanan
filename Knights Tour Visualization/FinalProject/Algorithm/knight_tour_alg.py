from Visualization.Knight_Animation import create_animation


def solve_knights_tour(board, x, y, move_count):
    """Recursively attempt to solve the Knight's Tour problem using backtracking."""
    """This code come from https://medium.com/@davidlfliang/intro-python-algorithms-knights-tour-problem-ab0a27a5728c"""

    x_cor = len(board)
    y_cor = len(board[0])
    size = x_cor * y_cor
    if move_count == size:

        return True
    
    knight_moves = [
        (2, 1), (1, 2), (-1, 2), (-2, 1),
        (-2, -1), (-1, -2), (1, -2), (2, -1)
    ]
    
    for dx, dy in knight_moves:
        new_x, new_y = x + dx, y + dy
        if check_valid(new_x, new_y, board):
            board[new_x][new_y] = move_count
            if solve_knights_tour(board, new_x, new_y, move_count + 1):
                return True
            board[new_x][new_y] = -1
    return False




def create_init_table(sizem, sizen):
    """Pass m, n for create initial tabel with m*n with every -1 fill in"""
    """Tested work"""
    chase_board = []
    for _ in range(sizem):
        row = []
        for _ in range(sizen):
            row.append(-1)
        chase_board.append(row)
    return chase_board


def check_valid(new_x, new_y, board):
    """Checking valid move state"""
    if 0 <= new_x < len(board) and 0 <= new_y < len(board[0]) and board[new_x][new_y] == -1:
        return True
    else:
        return False
    

def test_print(board):
    """Print each row as list"""
    for x in board:
        print(x)
        


def run_algo(input_m, input_n):
    """Test case"""
    board = create_init_table(input_m, input_n) # input m n from UI

    start_x, start_y = 0, 0  # change be daymic change, input by click in UI board

    board[start_x][start_y] = 0  # First move init, need init in UI
    
    if solve_knights_tour(board, start_x, start_y, 1):
        print("Log: valid graph")
        test_print(board)
        create_animation(board)
        return True
    else:
        print("Log Error: Non valid graph.")
        return False