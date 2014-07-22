load "gnuplot.preferences"

set terminal svg size 600,120 font "Sans,12"
set output "en-shares.svg"

set grid
set key opaque box height .1 width 0.1 samplen 0 spacing 0.95 right center
unset key
unset ytics
set xtics ("10" 10, "1" 1, "99" 99)
set xlabel "Simulated Distribution Of 100 Random Numbers"
set xrange [0:99]

set label 3 "Share & Block" at 19,-28 tc ls 3 rotate by 0
set label 2 "Share But Not Block" at 40,-28 tc ls 2
set label 1 "Invalid Block" at 69,-28 tc ls 1

## We cheat here: instead of illustrating true randomness
## (which---surprise---makes for random graphs), we illustrate a perfect
## distribution with random x values
plot "<for i in $( seq 89 ) ; do echo $( shuf -n1 -i10-99) $(shuf -n1 -i0-99) ; done" u 1:2 title "Invalid Block" ls 1 lw 2 pt 2, \
     "<for i in $( seq 9 ) ; do echo $(shuf -n1 -i1-9) $(shuf -n1 -i0-99); done" u 1:2 title "Share But Not Block" ls 2 pt 1 lw 2, \
     "<echo 0 50" u 1:2 title "Share & Block" ls 3 pt 4 lw 2

set terminal pngcairo size 600,120 font "Sans,12"
set output "en-shares.png"

replot
