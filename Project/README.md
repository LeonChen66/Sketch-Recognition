# SketchShop
Final project for sketch recognition.  
Photo editing exists everywhere in our daily life from the advertisements to robust conference papers. We will design a website system called SketchShop which allows users the add some vivid icons on her photos by just few simple sketches. We adopt GAN to do style transfer on the sketch from users and mask the output on the photos uploaded by users.

## Usage
In the terminal,run:
```
python sketchshop.py -i input_path -o output_path
```

## Citation
pix2pix cited from 
```
@inproceedings{CycleGAN2017,
  title={Unpaired Image-to-Image Translation using Cycle-Consistent Adversarial Networkss},
  author={Zhu, Jun-Yan and Park, Taesung and Isola, Phillip and Efros, Alexei A},
  booktitle={Computer Vision (ICCV), 2017 IEEE International Conference on},
  year={2017}
}
```