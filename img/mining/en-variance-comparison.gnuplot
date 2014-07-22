load "gnuplot.preferences"

set terminal svg size 600,220 font "Sans,12"
set output "en-variance-comparison.svg"

set ytics ("10%%" .1, "20%%" .2, "30%%" .3, "40%%" .4, "50%%" .5, "60%%" .6, "70%%" .7, "80%%" .8, "90%%" .9, "100%%" 1.0)
set yrange [0:1]
set key right bottom samplen 0.5
unset key
set ylabel "Culmative Probability\nOf Finding A Block"
set xlabel "Days Since Starting Search"
set grid

set label 1 "1x 'Average' (1/10,000) Miner's\nCulmative Probability Of\nFinding A Block" at 95,.65 tc ls 1
set label 2 "2x" at 65,.75 tc ls 2
set label 3 "4x" at 38,.83 tc ls 3
set label 4 "8x" at 7,.95 tc ls 4

plot [0:300] 1-exp(-(1./70)*x) ls 1 title "1x 'Average' Hash Rate", \
    1-exp(-(1./(70./2))*x) ls 2 title "2x 'Average' Hash Rate", \
    1-exp(-(1./(70./4))*x) ls 3 title "4x 'Average' Hash Rate", \
    1-exp(-(1./(70./8))*x) ls 4 title "8x 'Average' Hash Rate"

set samples 10000
set terminal pngcairo size 600,220 font "Sans,12"
set output "en-variance-comparison.png"

replot
