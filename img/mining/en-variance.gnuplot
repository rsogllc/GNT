load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-variance.svg"

set ytics ("10%%" .1, "20%%" .2, "30%%" .3, "40%%" .4, "50%%" .5, "60%%" .6, "70%%" .7, "80%%" .8, "90%%" .9, "100%%" 1.0)
set yrange [0:1]
set key right center

set grid


plot [0:300] 1-exp(-1./70*x) ls 1

set terminal png size 600,200 font "Sans,12"
set output "en-variance.png"

replot
