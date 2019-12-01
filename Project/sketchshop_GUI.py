# importing tkinter and tkinter.ttk
# and all their functions and classes
from tkinter import *
from tkinter.ttk import *
from tkinter import messagebox
# importing askopenfile function
# from class filedialog
from tkinter.filedialog import askopenfilename
import os
import keyboard

class sketchGUI():
    def __init__(self):
        super().__init__()
        root = Tk()
        root.geometry('400x300')
        root.title('SketchShop')
        openBotton = Button(root, text='Open', command=lambda: self.open_file())
        runBotton = Button(
            root, text='Run', command=lambda: self.run_sketchshop(self.file_path))
        # GANBotton = Button(
            # root, text='GAN', command=lambda: keyboard.press_and_release('q'))
        label = Label(
            root, text="1. Click Open to open the image to be processed. \n\
2. Click Run to draw on image. \n\
3. When finishing drawing, Press q to continue", relief=FLAT)
        openBotton.pack(side=TOP, pady=10)
        runBotton.pack(side=TOP, pady=10)
        label.pack(side=TOP,pady=10)
        # GANBotton.pack(side=TOP, pady=10)
        self.filepath = ""
        mainloop()

    # This function will be used to open file
    def open_file(self):
        self.file_path = askopenfilename(filetypes=[('All files', '*.*')])
        self.file_path = self.file_path.replace(' ', '\ ')

    # Run the main program for sketchshop
    def run_sketchshop(self, file_path):
        if not self.file_path:
            messagebox.showerror("Error", "No Input File, please open the file first")

        output_path = os.path.splitext(file_path)[0]+'_output.jpg'
        os.system('python sketchshop.py -i {} -o {}'.format(file_path, output_path))


if __name__ == "__main__":
    sketchshop = sketchGUI()
