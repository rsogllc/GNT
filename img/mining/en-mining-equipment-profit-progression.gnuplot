load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-profit-progression.svg"
set xlabel "Weeks Since Starting Mining At 1 Bitcoin / Week"
set ylabel "Combined Income"
set format y "%'g BTC"
set yrange [0:25]

set key left top reverse samplen 0 Left
unset key

set label "+5% Difficulty / Week" at 60,23 tc ls 1
set label "+10% Difficulty / Week" at 60,13 tc ls 2
set label "+15% Difficulty / Week" at 60,5 tc ls 3

plot [0:104] (1-exp(-.05*x))/(1-exp(-.05)) ls 1 title "+5% Difficulty / Week", \
    (1-exp(-.10*x))/(1-exp(-.10)) ls 2 title "+10%", \
    (1-exp(-.15*x))/(1-exp(-.15)) ls 3 title "+15%"

set samples 10000
set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-profit-progression.png"

replot


