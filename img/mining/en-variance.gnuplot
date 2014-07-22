load "gnuplot.preferences"

set terminal svg size 600,220 font "Sans,12"
set output "en-variance.svg"

set ytics ("10%%" .1, "20%%" .2, "30%%" .3, "40%%" .4, "50%%" .5, "60%%" .6, "70%%" .7, "80%%" .8, "90%%" .9, "100%%" 1.0)
set yrange [0:1]
set key right center samplen 0
unset key
set ylabel "Culmative Probability\nOf Finding A Block"
set xlabel "Days Since Starting Search"
set grid

set label 1 "An 'Average' (1/10,000) Miner's\nCulmative Probability Of\nFinding A Block" at 95,.65 tc ls 1


plot [0:300] 1-exp(-1/(10000*600./24/60/60)*x) ls 1

set samples 10000
set terminal pngcairo size 600,220 font "Sans,12"
set output "en-variance.png"

replot
