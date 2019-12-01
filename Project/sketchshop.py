"""
This is a script for sketch recognition. We use pretrained pix2pix model called edges2handbags to build an application which we can draw a sketched handbags
and the program will transform the sketch to real handbag photo then ps the photo on the original photo.

Example:
python sketchshop.py -i input_path -o output_path

When finishing drawing, press 'q' to continue. The final result will be under the ouput path.
"""
import cv2
import numpy as np
import os
import argparse
from itertools import chain

drawing = False  # true if mouse is pressed
mode = False  # if True, draw rectangle. Press 'm' to toggle to curve
ix, iy = -1, -1
mouse_travel = [[], []]
img = []

# mouse callback function
def draw_line(event, x, y, flags, param):
    global ix,iy,drawing,mode
    if event == cv2.EVENT_LBUTTONDOWN:
        drawing = True
        mouse_travel[0].append([])
        mouse_travel[1].append([])
        ix,iy = x,y

    elif event == cv2.EVENT_MOUSEMOVE:
        if drawing == True:
            if mode == True:
                cv2.rectangle(img,(ix,iy),(x,y),(0,255,0),-1)
            else:
                cv2.line(img, (ix, iy), (x, y),
                         color=(0, 0, 0), thickness=3)
                ix, iy = x, y
                mouse_travel[0][-1].append(ix)
                mouse_travel[1][-1].append(iy)

    elif event == cv2.EVENT_LBUTTONUP:
        drawing = False
        if mode == True:
            cv2.rectangle(img,(ix,iy),(x,y),(0,255,0),-1)
        else:
            cv2.line(img, (ix, iy), (x, y),
                     color=(0, 0, 0), thickness=3)


def draw_sketch(img_path):
    # img = np.ones((512, 512, 3), np.uint8) * 255
    global img
    img = cv2.imread(img_path)
    cv2.namedWindow('image', cv2.WINDOW_NORMAL)
    cv2.setMouseCallback('image', draw_line)

    while(1):
        cv2.imshow('image', img)
        k = cv2.waitKey(1) & 0xFF
        if k == ord('m'):
            mode = not mode
        elif k == 27:
            break
        elif k == ord('q'):
            break

    cv2.destroyAllWindows()


def remove_background(img_path='/Users/leonchen/Desktop/TAMU Courses/Sketch-Recognition/Project/pytorch-CycleGAN-and-pix2pix/results/edges2handbags_pretrained/test_latest/images/test_fake_B.png',thres=127):
    src = cv2.imread(img_path)
    tmp = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
    _, alpha = cv2.threshold(tmp, thres, 255, cv2.THRESH_BINARY_INV)
    b, g, r = cv2.split(src)
    rgba = [b, g, r, alpha]
    dst = cv2.merge(rgba, 4)
    cv2.imwrite("test.png", dst)
    return dst


def blend_imgs(src, dst, x_shift, y_shift):

    for x in range(dst.shape[1]):
        for y in range(dst.shape[0]):
            if dst[y, x, 3] != 0:
                try:
                    src[y+y_shift, x+x_shift, :] = dst[y, x, :3]
                except:
                    pass
    return src

def main():
    # initiate the parser
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--input",
                    help="input path")
    parser.add_argument("-o", "--output",
                    help="output path")
    # read arguments from the command line
    args = parser.parse_args()

    input_path = args.input
    output_path = args.output
    # draw on input image
    draw_sketch(input_path)

    # scale the pix2pix input
    x_list = np.array(mouse_travel[0])
    y_list = np.array(mouse_travel[1])
    x_min, x_max, y_min, y_max = min(chain.from_iterable(mouse_travel[0])), \
        max(chain.from_iterable(mouse_travel[0])), \
        min(chain.from_iterable(mouse_travel[1])), \
        max(chain.from_iterable(mouse_travel[1]))

    x_range = int(x_max - x_min)
    y_range = int(y_max - y_min)
    sketch = np.ones((int(y_range*1.3), int(x_range*1.3)), np.uint8) * 255

    # draw line on an empty image for pix2pix input
    for i in range(len(x_list)):
        for j in range(1, len(x_list[i])):
            cv2.line(sketch, (x_list[i][j-1]-int(x_min) + int(x_range*0.1), y_list[i][j-1]-int(y_min) + int(y_range*0.1)),
                     (x_list[i][j]-int(x_min) + int(x_range*0.1), y_list[i][j]-int(y_min) + int(y_range*0.1)), color=(0, 0, 0), thickness=3)

    sketch = cv2.resize(sketch, (256, 256))

    # pix2pix for edges2handbags
    cv2.imwrite(
        'pytorch-CycleGAN-and-pix2pix/datasets/Sketch/test/test.jpg', sketch)
    os.chdir('pytorch-CycleGAN-and-pix2pix')
    os.system('python test.py --dataroot datasets/Sketch/ --direction BtoA --model pix2pix --name edges2handbags_pretrained --gpu_ids -1')
    os.chdir('..')

    # remove background, transform back to origin size and ps
    dst = remove_background(thres=200)
    dst = cv2.resize(dst, (int((y_max-y_min)*1.3), int((x_max-x_min)*1.3)))
    src = cv2.imread(input_path)
    final = blend_imgs(src, dst, x_shift=x_min -
                       int(x_range*0.1), y_shift=y_min-int(y_range*0.1))    

    # save and show the final result
    cv2.imwrite(output_path,final)

    cv2.startWindowThread()
    cv2.namedWindow('sketchshop', cv2.WINDOW_NORMAL)
    cv2.imshow('sketchshop', final)
    cv2.waitKey(0)

if __name__ == "__main__":
    main()


