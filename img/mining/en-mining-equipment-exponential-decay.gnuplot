load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-exponential-decay.svg"

set format y "%'g BTC"
set ytics .2
set ylabel "Income Per Week"
set xlabel "Weeks Since Starting Mining At 1 Bitcoin / Week"
set grid
unset key

set label 1 "+5% Difficulty / Week" at 8,.72  rotate by -0 left tc ls 1
set label 2 "+10%" at 15,.25  rotate by -0 left tc ls 2
set label 3 "+15%" at 2,.1  rotate by -0 left tc ls 3

plot [0:104] exp(-.05*x) ls 1, \
    exp(-0.10*x) ls 2 title "+10% Difficulty / Week", \
    exp(-0.15*x) ls 3 title "+15% Difficulty / Week"


set samples 10000
set terminal pngcairo size 600,200 font "Sans,12"
set output "en-mining-equipment-exponential-decay.png"

replot


