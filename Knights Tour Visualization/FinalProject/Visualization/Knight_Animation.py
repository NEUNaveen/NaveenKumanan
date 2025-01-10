import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import numpy as np
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
import matplotlib.image as mpimg

def create_animation(solution_board):
    fig = plt.figure(figsize=(10, 10))
    ax = fig.add_subplot(111)
    #plt.subplots_adjust(left=0.1, right=0.9, top=0.9, bottom=0.1)
    board_rows = len(solution_board)
    board_cols = len(solution_board[0])

    knight_img = mpimg.imread('chess-knight-2.png')
    if len(solution_board) > 5:
        imagebox = OffsetImage(knight_img, zoom=0.07)
    else:
        imagebox = OffsetImage(knight_img, zoom=0.07)

    # Find coordinates for each move number
    move_positions = {}
    for i in range(board_rows):
        for j in range(board_cols):
            move_positions[solution_board[i][j]] = (i, j)

    def update_animation(frame):
        ax.clear()

        # Draw chessboard
        for i in range(board_rows):
         for j in range(board_cols):
                color = 'white' if (i + j) % 2 == 0 else 'lightgray'
                ax.add_patch(plt.Rectangle((j, board_rows-1-i), 1, 1, color=color))
                # Center the numbers in each tile
                ax.text(j + 0.5, board_rows-1-i + 0.5, str(solution_board[i][j]),
                     ha='center', va='center')

    # Draw path up to current frame
        path_coords = [move_positions[i] for i in range(frame + 1)]
        if path_coords:
            path_x = [coord[1] + 0.5 for coord in path_coords]  # Add 0.5 to center in tile
            path_y = [board_rows-1-coord[0] + 0.5 for coord in path_coords]  # Add 0.5 to center in tile
            ax.plot(path_x, path_y, 'b-', alpha=0.5)

        # Draw knight at current position centered in tile
        if frame in move_positions:
            curr_x, curr_y = move_positions[frame]
            ab = AnnotationBbox(imagebox, (curr_y + 0.5, board_rows-1-curr_x + 0.5), frameon=False)
            #ax.plot(curr_y + 0.5, board_size-1-curr_x + 0.5, 'ro', markersize=20)
            ax.add_artist(ab)
     # Ensure full board visibility
        #ax.set_xlim(-0.9, board_size-0.1)
        #ax.set_ylim(-0.9, board_size-0.1)
        ax.grid(True)
        ax.set_aspect('equal')  # Make cells square
        ax.set_title(f'Move {frame}')
        ax.set_aspect('equal', adjustable='box')

    total_moves = board_rows * board_cols
    anim = FuncAnimation(
        fig,
        update_animation,
        frames=total_moves,
        interval=500,
        repeat=False
    )
    plt.show()

# After your algorithm finds the solution, call:
# create_animation(board)