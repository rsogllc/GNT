load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-electricity-cooling.svg"

set key left top Left reverse samplen .01 spacing .8 nobox
unset key
set xlabel "Weeks Since Starting Mining With Imaginary 5 BTC Equipment"
set ylabel "Investment Return"
set format y "%'g BTC
set yrange [-5:20]

set label 1 "Free Electricity [+5% Diff. / Week]" at 50,17 tc ls 1
set label 2 "    0.1 BTC / Week Electricity * 167%\n(100% Mining + 67% Cooling) [+5%]" at 43,11.5 tc ls 2 rotate by -0
set label 3 "0.2 BTC * 167% [+5%]" at 58,-3.5 tc ls 3 rotate by -0

plot [0:104] \
(1-exp(-.05*x))/(1-exp(-.05))-5-.2*1.67*x title "0.2 BTC/Week Electricity * 167% (100% Mining + 67% Cooling)" ls 3, \
(1-exp(-.05*x))/(1-exp(-.05))-5-.1*1.67*x title "0.1 BTC/Week * 167%" ls 2, \
(1-exp(-.05*x))/(1-exp(-.05))-5 title "Free Electricity" ls 1

## PNG Labels In Slightly Wrong Place
set label 1 "Free Electricity [+5% Diff. / Week]" at 45,17 tc ls 1
set label 2 "    0.1 BTC / Week Electricity * 167%\n(100% Mining + 67% Cooling) [+5%]" at 43,11.5 tc ls 2 rotate by -0
set label 3 "0.2 BTC * 167% [+5%]" at 58,-3.5 tc ls 3 rotate by -0
set samples 10000
set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-roi-electricity-cooling.png"

replot


