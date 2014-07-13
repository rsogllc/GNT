load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-electricity-cooling.svg"

set key left top Left reverse samplen .01 spacing .8 nobox
set yrange [-5:20]

plot [0:104] \
(1-0.95**x)/.05-5-.2*1.67*x title "0.2 BTC/Week Electricity * 167% (100% Mining + 67% Cooling)" ls 3, \
(1-0.95**x)/.05-5-.1*1.67*x title "0.1 BTC/Week * 167%" ls 2, \
(1-0.95**x)/.05-5 title "Free Electricity" ls 1

set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-electricity-cooling.png"

replot


