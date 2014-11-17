load "gnuplot.preferences"

set terminal svg size 600,220 font "Sans,12"
set output "en-confirmed-double-spend-cost.svg"

set grid
set ylabel "Cost Of Attack\nIn Sacrificed Income"
set xlabel "Attacker's Percent Of Network Hash Rate"
set format x "%0.f%%"
set decimal locale
#set format y "฿%'g" ## doesn't render in PNG here
set format y "%'g BTC"
unset key

set ytics 1000
set yrange [0:3000]
set xrange [0:40]


## a.out (below) is the the satoshi-probability-calculator.c from this
##   directory compiled with gcc -lm. Its first argument is attackers
##   share of the network hash rate (100%=1.00); its second argument is
##   the number of block which must be created before anyone else finds
##   any blocks
#
## For more info about the formula used, see the /en/mining HTML comment
## near where this plot is first used.

set label 1 "1 Confirmation\nSecurity" at 1,2800 tc ls 1 rotate by -0
set label 2 "6 Confirmation\nSecurity" at 23.0,2800 tc ls 2 rotate by -0
#set label 3 "Majority\nAttack→" at 41,2800 tc ls 3 rotate by -0

plot "<for i in $( seq -w 0001 5000 ) \
      ; do prob=$( ./a.out .$i 2 ) \
      ; cost=$( echo 'scale=5;' .$i '*' 25 '*' 2 / $prob - 25 '*' 1 | bc ) \
      ; echo $( echo 'scale=5;' .$i '*' 100 | bc ) $prob $cost  \
      ; done" u 1:3 title "1 Confirmation Security" with lines ls 1, \
\
    "<for i in $( seq -w 001 500 ) \
      ; do prob=$( ./a.out .$i 7 ) \
      ; cost=$( echo 'scale=5;' .$i '*' 25 '*' 7 / $prob - 25 '*' 6 | bc ) \
      ; echo $( echo 'scale=5;' .$i '*' 100 | bc ) $prob $cost  \
      ; done" u 1:3 title "6 Confirmation Security" with lines ls 2 \

set terminal pngcairo size 600,220 font "Sans,12"
set output "en-confirmed-double-spend-cost.png"

replot
