load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-roi.svg"

set key right top
set yrange [-5:20]

plot [0:104] 1*(1-0.95**x)/0.05-5 ls 1, 1*(1-0.90**x)/0.10-5 ls 2, 1*(1-0.85**x)/0.15-5 ls 3

set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-roi.png"

replot


