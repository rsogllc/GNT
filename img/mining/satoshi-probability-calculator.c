#include <math.h>  // remember to use gcc -lm
#include <stdio.h>
#include <stdlib.h>

// Verbatim code from bitcoin.pdf page 7
double AttackerSuccessProbability(double q, int z)
{
    double p = 1.0 - q;
    double lambda = z * (q / p);
    double sum = 1.0;
    int i, k;
    for (k = 0; k <= z; k++)
    {
        double poisson = exp(-lambda);
        for (i = 1; i <= k; i++)
            poisson *= lambda / i;
        sum -= poisson * (1 - pow(q / p, z - k));
    }
    return sum;
}

// Accept command line arguments for q (attacker's network hash rate
// <=1.00) and z (number of blocks to create before anyone else creates one
// block---usually confirmations + 1)
main(int argc, char *argv[]) {
    double q = atof(argv[1]);
    int z = atoi(argv[2]);

    printf("%f\n", AttackerSuccessProbability(q,z));
}

