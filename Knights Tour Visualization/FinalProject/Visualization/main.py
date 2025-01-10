import tkinter

from Algorithm.knight_tour_alg import run_algo
from tkinter import *

def main():
    #CITATION: https://www.geeksforgeeks.org/python-gui-tkinter/#
    master = Tk()
    master.title('Knight Tour')
    # master.geometry("700x350")

    # Configure rows and columns to center widgets
    master.grid_rowconfigure(0, weight=1)  # Top spacing
    master.grid_rowconfigure(1, weight=1)  # Center content
    master.grid_rowconfigure(2, weight=1)  # Bottom spacing
    master.grid_columnconfigure(0, weight=1)  # Left spacing
    master.grid_columnconfigure(1, weight=1)  # Center content
    master.grid_columnconfigure(2, weight=1)  # Right spacing

    labelRow = Label(master, text='number of rows', font=('Arial', 20))
    labelRow.grid(row=0, column = 0)
    LabelColumn = Label(master, text='number of columns', font=('Arial', 20))
    LabelColumn.grid(row=1, column=0)
    label_inv = Label(master, text="Invalid board", font=('Arial', 20))

    e1 = Entry(master, font=('Arial', 20))
    e2 = Entry(master, font=('Arial', 20))
    e1.grid(row=0, column=1)
    e2.grid(row=1, column=1)


    button = Button(master, text="Show Tour!", command=lambda: on_click(e1.get(), e2.get(), master, label_inv), font=('Arial', 20))
    button.grid(row=2, column = 1)
    center_and_top(master)
    mainloop()

def on_click(e1text, e2text, master, label_inv):
    if not run_algo(int(e1text), int(e2text)):
        label_inv.grid(row=2, column=0)
    else:
        label_inv.grid_forget()

def center_and_top(window):

    width = 700
    height = 350

    screen_width = window.winfo_screenwidth()
    screen_height = window.winfo_screenheight()

    # Calculate x and y coordinates for the top-left corner
    x = (screen_width - width) // 2
    y = (screen_height - height) // 2

    # Set the geometry of the window
    window.geometry(f"{width}x{height}+{x}+{y}")

    window.lift()
    window.focus_force()

if __name__ == "__main__":
    main()