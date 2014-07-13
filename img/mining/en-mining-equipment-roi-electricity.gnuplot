load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-electricity.svg"

set key left top Left reverse samplen .01 spacing .7 nobox
set yrange [-5:20]

plot [0:104] (1-0.95**x)/.05-5 title "Free Electricity @ ~5% Weekly Difficulty Increase" ls 1, \
(1-0.95**x)/.05-5-.1*x title "0.1 BTC/Week Electricity @ ~5%" ls 2, \
(1-0.95**x)/.05-5-.2*x title "0.2 BTC/Wk" ls 3, \
(1-0.95**x)/.05-5-.3*x title "0.3 BTC/Wk" ls 4

set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-electricity.png"

replot


