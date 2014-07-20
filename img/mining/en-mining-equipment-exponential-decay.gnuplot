load "gnuplot.preferences"

set terminal svg size 600,200 font "Sans,12"
set output "en-mining-equipment-exponential-decay.svg"

set format y "%'g BTC"
set ytics .2
set ylabel "Income Per Week"
set xlabel "Weeks Since Starting Mining At 1 Bitcoin / Week"
set grid


plot [0:104] exp(-.05*x) ls 1 title "+5% Difficulty / Week", \
    exp(-0.10*x) ls 2 title "+10% Difficulty / Week", \
    exp(-0.15*x) ls 3 title "+15% Difficulty / Week"


set terminal png size 600,200 font "Sans,12"
set output "en-mining-equipment-exponential-decay.png"

replot


