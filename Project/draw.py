import cv2
import numpy as np
import os
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
                         color=(0, 0, 0), thickness=1)
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
    img = cv2.imread('hand.jpeg')
    cv2.namedWindow('image')
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

def main():
    draw_sketch('hand.jpeg')
    x_list = np.array(mouse_travel[1])
    y_list = np.array(mouse_travel[0])
    x_min, x_max, y_min, y_max = min(chain.from_iterable(mouse_travel[1])), \
        max(chain.from_iterable(mouse_travel[1])), \
        min(chain.from_iterable(mouse_travel[0])), \
        max(chain.from_iterable(mouse_travel[0]))

    sketch = np.ones(
        (int((x_max-x_min)*1.3), int((y_max-y_min)*1.3)), np.uint8) * 255
    x_range = int(x_max - x_min)
    y_range = int(y_max - y_min)
    cv2.imwrite('sketch1.jpg', sketch)

    for i in range(len(x_list)):
        for j in range(1, len(x_list[i])):
            cv2.line(sketch, (y_list[i][j-1]-int(y_min) + int(y_range*0.1), x_list[i][j-1]-int(x_min) + int(x_range*0.1)),
                    (y_list[i][j]-int(y_min) + int(y_range*0.1), x_list[i][j]-int(x_min) + int(x_range*0.1)), color=(0, 0, 0), thickness=1)

    cv2.imwrite('sketch2.jpg', sketch)
    sketch = cv2.resize(sketch, (256, 256))
    cv2.imwrite('sketch3.jpg', sketch)

    cv2.imwrite('pytorch-CycleGAN-and-pix2pix/datasets/Sketch/test/test.jpg', sketch)
    os.chdir('pytorch-CycleGAN-and-pix2pix')
    os.system('python test.py --dataroot datasets/Sketch/ --direction BtoA --model pix2pix --name edges2handbags_pretrained --gpu_ids -1')

if __name__ == "__main__":
    main()


