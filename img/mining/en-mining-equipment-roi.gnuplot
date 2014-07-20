load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-roi.svg"
set xlabel "Weeks Since Starting Mining At 1 Bitcoin / Week"
set xlabel "Weeks Since Starting Mining With Imaginary 5 BTC Equipment"
set ylabel "Investment Return"
set format y "%'g BTC"
set yrange [-5:20]

set key left top reverse samplen 0 Left
unset key

set label "+5% Difficulty / Week" at 60,17 tc ls 1
set label "+10% Difficulty / Week" at 60,8 tc ls 2
set label "+15% Difficulty / Week" at 60,0 tc ls 3

plot [0:104] (1-exp(-.05*x))/(1-exp(-.05))-5 ls 1 title "+5% Difficulty / Week", \
    (1-exp(-.10*x))/(1-exp(-.10))-5 ls 2 title "+10%", \
    (1-exp(-.15*x))/(1-exp(-.15))-5 ls 3 title "+15%"

set samples 10000
set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-roi.png"

replot


