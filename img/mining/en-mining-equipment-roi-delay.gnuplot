load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-delay.svg"

set key right top
set yrange [-5:20]

plot [0:104] x>2 ? 1*(1-0.95**x)/0.05-1*(1-0.95**2)/0.05-5 : 1/0 ls 1 title "2 Week Delay @ 5%", \
x>2 ? 1*(1-0.90**x)/0.10-1*(1-0.90**2)/0.10-5 : 1/0 ls 2 title "2 Week Delay @ 10%", \
x>2 ? 1*(1-0.85**x)/0.15-1*(1-0.85**2)/0.15-5 : 1/0 ls 3 title "2 Week Delay @ 15%" 

set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-delay.png"

replot


