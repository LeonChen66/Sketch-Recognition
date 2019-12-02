# SketchShop
Final project for Sketch Recognition.

### Motivation
Photo editing exists everywhere in our daily life from the advertisements to robust conference papers. We will design a website system called SketchShop which allows users the add some vivid icons on her photos by just few simple sketches. We adopt GAN to do style transfer on the sketch from users and mask the output on the photos uploaded by users.

### Requirement
* opencv
* tkinter
* numpy

### Usage
In the terminal,run
```
python sketchshop.py -i input_path -o output_path
```

or run 
```
python sketchshop_GUI.py
```
to open the GUI for this program

1. Click Open to open the image to be processed.  
2. Click Run to draw on image.  
3. When finishing drawing, Press q to continue"

### Citation
pix2pix cited from 
```
@inproceedings{isola2017image,
  title={Image-to-Image Translation with Conditional Adversarial Networks},
  author={Isola, Phillip and Zhu, Jun-Yan and Zhou, Tinghui and Efros, Alexei A},
  booktitle={Computer Vision and Pattern Recognition (CVPR), 2017 IEEE Conference on},
  year={2017}
}
```