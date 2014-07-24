---
layout: base
lang: en
id: developer-guide
title: "Bitcoin Mining"
---

<!-- style notes:

    * use "bitcoins" as the default unit of account

    * miner == person who mines (miner != mining equipment or software)

    * hash rate / network hash rate (instead of hash power). Also put space
      in "hash rate" (not "hashrate")

    * low variance miners get paid more consistently (instead of "reliably")

    * "share chain" instead of "sharechain" (P2Pool docs are
      inconsistent, so we match our 'block chain' style)

    * bold actual bitcoin terms on first introduction
-->

# Bitcoin Mining Guide

<p class="summary">Find detailed information about Bitcoin mining.</p>

<div markdown="1" id="toc" class="toc"><div markdown="1">

* Table of contents
{:toc}

<ul class="reportissue"><li><a href="https://github.com/bitcoin/bitcoin.org/issues/new" onmouseover="updateIssue();">Report An Issue</a></li></ul>

</div></div>

<div markdown="1" class="toccontent">

This guide helps you find answers to the following questions:

* [What does mining do?][section how it works]

* [What tools and techniques do miners use?][section tools and
techniques]

* [What income and expenses can miners expect?][section income and
expenses]

* [Why should miners choose to be honest?][section choose to be honest]

But, before you start reading, we urge you to review the following
warnings:

![Warning icon](/img/icon_warning.svg)
**You Could Lose Your Money:** mining requires an investment of time and money with no
guarantee of return. Never invest more money into bitcoins or mining
equipment than you can afford to lose.

![Warning icon](/img/icon_warning.svg)
**Watch Out For Scams:** many scams surround Bitcoin mining. Several common
scams are [described in this guide][section scams], but you should also remain on guard
against new or uncommon scams.




## Theory

Bitcoin mining protects the Bitcoin network and releases new bitcoins
into circulation.

To understand mining, it's useful to understand that you can't actually
give someone bitcoins. Instead, you can digitally sign a promise to give
someone *control* over a certain amount of bitcoins. The receiver of
that promise can then digitally sign another promise to give someone
else control over those bitcoins.

![Users Sign Promises To Give Control Over Bitcoins To Other People](/img/mining/en-unvalidated-promises.svg)

Nobody wants to accept promises over the Internet from people they don't
know or trust, so Bitcoin mining validates these promises and makes it
difficult for anyone to take back or change a promise they made earlier.
This lets people trust the mining process rather than the person who
made the promise.

![Mining Validates And Protects Promises So Users Who Get Paid, Stay Paid](/img/mining/en-mining-validation.svg)

Mining also releases new bitcoins into circulation. In this special
case, miners are allowed to give themselves control over a certain
amount of new bitcoins, which allows them to later pass on control of those
bitcoins to other people.

Many people focus on mining as the distribution of new bitcoins---it is
called mining after all---but unless users can trust mining to validate
and protect promises, Bitcoin is useless and bitcoins have no value.


### Record Keeping

Bitcoin relies on signed promises which are vulnerable to a particular
type of fraud, called **double spending,** where a fraudster signs two
contradictory promises, one saying "I give control over my only bitcoin
to Alice" and another promise saying "I give control over my only
bitcoin to Bob."

Only one of these promises can be accepted. It doesn't matter which one
as long as people know which promise won't be accepted. If Bob knows
the promise he received won't be accepted, he won't give anything to the
fraudster, so it will be attempted fraud rather than actual fraud.

Preventing double spending is as simple as keeping a record of accepted
promises. We only accept a promise if the person who makes that promise
actually controls the bitcoins he's promising to give away and if that
promise is signed with his cryptographic signature. In the example
above, only one of the promises gets added to the record, so when Bob
checks the record to see whether the promise he received is accepted (and
discovers it's not), he knows not to give anything to the fraudster.

### Bitcoin Lottery

Who do we trust to keep the record of accepted promises? If the
fraudster controls the record, he can lie to both Alice and Bob, telling
them that his promises are on the record when they're not. If nobody
controls the record, then there can be competing records, some that have
the promise to Alice and some that have the promise to Bob. Instead,
Bitcoin holds a decentralized lottery to decide which promises to add to
the record.

In the decentralized lottery, everyone creates their own tickets and
everyone knows in advance what the winning number is. Tickets are a
collection of data which includes one or more promises. When you run
this data through a formula, it produces a seemingly-random number,
called a **hash.** If that hash number is less than the winning number
(called a **target**), you have a winning ticket.

### Proof Of Work

You can create as many decentralized lottery tickets as you want, but it
takes a certain amount of computing work to check each ticket. If the
ticket is a loser, that work seems wasted---but the only way to find a
winning ticket is to check a lot of losing tickets. That means a winning
ticket in the Bitcoin lottery proves that a lot of work was done to find
it, called **proof of work.**

![Checking Random Hash Numbers From Many Different Tickets Requires Work](/img/mining/en-ticket-checking.svg)

Work uses resources that could be used elsewhere, so proof of work is
proof that somebody sacrificed something in return for creating a
winning lottery ticket. This sacrifice must be made by everyone who
wants to create a winning ticket---even fraudsters. This allows
Bitcoin to create incentives that can reward **honest miners** for their
sacrifice and punish fraudsters for trying to change the record of
promises.




### The Block Chain

Because each miner creates his own tickets with whatever data he
chooses, it's not possible to prove when a miner found a ticket.
This means a the first winning ticket found doesn't necessarily win
the lottery.

Having only one winning ticket is important, because the promises on
that ticket get added to the official record of promises. If we had two
winning tickets, they could add conflicting promises, which doesn't
work. We must also prevent someone from later changing which ticket won
the lottery or a replacement ticket could change the official
record and remove some of the promises people relied upon. Bitcoin
partly solves 
this problem the same way it partly solves the official record problem
in the first place: another lottery.

In order to create a valid ticket for a particular lottery, that ticket
must include the winning number of a ticket from the previous lottery.

![Tickets Must Include The Winning Hash Number Of A Ticket From The Previous Lottery](/img/mining/en-sequential-chain.svg)

The tickets form a chain with each winning ticket linking to a
previous winning ticket. Whenever there are two or more winning tickets
for a particular lottery, we find which ticket is part of the **longest
chain** and declare that the actual winning ticket.

![Winning Tickets Must Be Part Of The Longest Chain To Be Actual Winners](/img/mining/en-forked-chain.svg)

This means a miner cannot change the official record by finding
winning tickets for a past lottery unless he also finds winning
tickets for every subsequent lottery up until the present. To
accomplish this, the miner must do more work (on average) than every
other miner combined. This requirement to do more work than everyone
else combined is the mechanism that punishes fraudsters for trying to
change the official record.

The lottery tickets we've been talking about are called **blocks,** and the
longest chain of lottery tickets is called the Bitcoin **block chain.**  Each
block on the block chain holds one or more signed promises, called
**outputs** (which are part of **transactions**), making the block chain the
official record of promises in Bitcoin.  

Honest miners who simply add blocks to the block chain (instead of
trying to change anything) receive a **block reward** of bitcoins for
each block they find, currently valued at 25 bitcoins or more.


### Attacks

Users can trust the block chain (official record) instead of each other,
making Bitcoin useful for sending wealth over the Internet. But the same
miners who build the block chain can also attack it, making Bitcoin less
useful and bitcoins less valuable.

#### Majority Attack

Recall from the [block chain section][section the block chain] that a miner must do more work
than every other miner combined in order to find enough winning tickets
(valid blocks) to change the official record (the block chain). This is
a **majority attack,** often called a **51% attack.**

A miner who does the majority of work on the network can, given enough
time, change the results of any past lottery, allowing him to undo
previous transactions.  For example, he can:

* **Steal For Himself:** Replace (double spend) a transaction where he paid Alice with a
  different transaction that pays himself, stealing back to himself
  the bitcoins he previously paid Alice.

* **Steal For Others:** Offer to help other people replace (double spend) their previous
  transactions for a fee, letting them steal back to themselves the
  bitcoins they previously paid.

* **Extort From Merchants:** Threaten to make purchases with bitcoin which he will later double
  spend unless merchants pay him an extortion fee today. (He can charge
  people this extortion fee based on the possibility of an attack even
  if he never actually attacks.)

In short, a majority miner has the power to make Bitcoin completely
unreliable. The price of bitcoins should drop to zero when Bitcoin
becomes unreliable, making it hard for a majority miner to profit from
stealing or extorting now-worthless bitcoins. However, a majority miner
could find it worthwhile for other reasons to make Bitcoin unreliable,
so the Bitcoin community tries to discourage majority mining.



#### Lucky Attack

The majority attacker does more work than everyone else combined, so he
wins more lotteries than everyone else combined---which allows him to
create a longer block chain than everyone else combined, giving him
control over the official record.

But lotteries are based on chance, and someone with **"good luck"** can
win two or more lotteries in a row even if they don't do a majority of
the work. This is usually pretty boring: if an honest miner adds two
blocks to the end of the block chain before anyone else, he simply gets
two block rewards---the same as if he had created any other two blocks.

However, if a dishonest miner is willing to risk losing his block
reward, he can attempt to change the official record. Instead of trying
to add a block to the **tip** of the block chain, he tries to replace the
block at the current tip. To make this work, he has to also find the
next block so that he can choose his replacement block as the winner of
the previous lottery.

![Lucky Attackers Find Multiple Blocks Before Honest Miners Find One](/img/mining/en-forked-chain-attack.svg)

The attack fails if someone else adds one new block to the tip before
the attacker can find two blocks. Any work an attacker does on a failed
attack is sacrificed without earning back any bitcoins.

Although luck is random, probabilities are predictable, so we can
estimate how many times a miner will have to try an attack before he
succeeds and how much income he will sacrifice in the process. To replace
a single block, as in the example above, a miner who does 5% of the work
on the network and who attempts to attack every block will succeed about
once every 19 hours by sacrificing about 48 bitcoins worth of income. He
can steal or extort back that lost income if he can:

* **Steal For Himself:** Replace (double spend) transactions from the last block, where he paid
  other people more than 48 bitcoins, with new transactions that pay
  himself, stealing back to himself those 48-plus bitcoins.

* **Steal For Others:** Offer to help other people replace their previous transactions from
  the last block for a fee totaling more than 48 bitcoins, letting them
  steal back to themselves the bitcoins they previously paid.

* **Extort From Merchants:** Threaten to make purchases with bitcoin which he will later double
  spend unless merchants pay him an extortion fee today. (He can charge people
  this extortion fee based on the possibility of an attack even if he
  never actually attacks.)

Bitcoin's lottery system helps users protect themselves from these
"lucky attacks" by giving each transaction a **confirmation** score
which increases by one for each block that protects that transaction.
The more blocks an attacker needs to find in a row before anyone else,
the more luck he needs to have. For example, the illustration below
shows that the 5% attacker could never practically attack a transaction
with six confirmations.

![The Cost In Sacrificed Income Of An Attack On Confirmed Transactions](/img/mining/en-confirmed-double-spend-cost.svg)

<!-- the average cost of a successful attack here is

    r * h / p(h,b) - r * b

Where _r_ is the block reward (25 BTC), _h_ is the percentage of network
hash rate, _p()_ is Satoshi's probability calculator from bitcoin.pdf
page 7, and _b_ is the number of blocks to create (confirmations plus
one). r * h is the average value of work used per attempt; p(h,b) is the
probability of success per attempt; r * b is the block reward from a
successful attack.

The time (number of blocks elapsed) an attack takes is simply

    1 / p(h,c)
-->

However, an attacker who does 24.4% of the work on the network (called
**network hash rate**) could attack a transaction with six confirmations
for that cost of 48 bitcoins. As seen in the illustration above, the amount
of luck required to make a successful attack drops exponentially as an
attacker gets closer to becoming a majority miner.

Just as the Bitcoin community discourages majority mining, it also to a
lesser extent discourages anyone from mining with a significant
fraction of the network hash rate because these miners can also make
Bitcoin unreliable. It would be preferable if nobody controlled the
roughly 15% network hash rate required to practically attack
transactions confirmed six times, and ideal if nobody controlled the
roughly 1% network hash rate required to practically attack transactions
confirmed just once.





## Tools And Techniques

Outside of Bitcoin itself, miners have created tools and techniques to
solve problems they've encountered trying to win the lottery:

* **[Hardware And Software][section hardware and software]:** How can
  miners use specialized mining hardware that Bitcoin Core does not
  support? Miners develop and use specialized mining software which
  manages communication between mining equipment and Bitcoin software.

* **[Pooling][section pooling]:** In the Bitcoin lottery, bad luck can delay a big miner's next payment
  by hours or days---but it can delay a small miner's payment by weeks
  or months---so how do we prevent bad luck from driving small miners
  out of business? Small miners become big miners when they work
  together, combining work and splitting rewards.

* **[Shares][section shares]:** How can tiny miners combine work with small miners and ensure each
  miner gets paid fairly? Miners hold a miniature version of the lottery
  Bitcoin itself holds.

* **[Decentralized Mining][section decentralized mining]:** How do small miners combine work without giving up control over
  their hardware to someone who can use it in an attack? Miners can
  choose from two different protocols that let them keep control over
  what they mine.


### Hardware And Software

As Bitcoin has matured, people have begun splitting off parts of the
system so that they can focus on the needs of that particular part.
One part that was split off is the code for doing the work in
Bitcoin's proof of work, called **hashing.**

This specialization ultimately moved the hashing to dedicated hardware,
called Application-Specific Integrated Circuits (**ASICs**), which vastly
outperform Bitcoin Core software running on a general computer.

Bitcoin Core does not use ASICs directly. Instead, mining
software was developed which takes the information that needs to be
hashed, gives it to the ASIC, and returns the results to Bitcoin
Core or another specialized program.

If the information that needs to be hashed comes primarily from your
own full node (such as Bitcoin Core), it's **decentralized mining.**
If the information comes from someone else's server, it's **centralized
mining.**

**Resources:** The Bitcoin Wiki has lists of [mining hardware][wiki
mining hardware] and [mining software][wiki mining software]. On
BitcoinTalk there is a [mining hardware sub-forum][] and [mining software
sub-forum][].

[wiki mining hardware]: https://en.bitcoin.it/wiki/Mining_hardware_comparison
[wiki mining software]: https://en.bitcoin.it/wiki/Mining_software
[mining software sub-forum]: https://bitcointalk.org/index.php?board=42.0
[mining hardware sub-forum]: https://bitcointalk.org/index.php?board=76.0



### Pooling

Bitcoin is designed so that about one block is created on average every
600 seconds (10 minutes). If there are 10,000 Bitcoin miners, that means
the average miner is only creating a block (on average) once every 70
days.

Even worse, mining is a chance-based lottery, so sometimes a miner will
get paid earlier than expected (called "lucky" or "good luck") and
sometimes the miner will get paid later than expected (called "unlucky"
or "bad luck"). The chance of getting paid follows an exponential
distribution; for example, here is the distribution for a miner who
should get paid on average every 70 days:

![The Variance Of An Average (1/10,000) Miner](/img/mining/en-variance.svg)

As you can see, this imaginary "average" miner with
1/10,000<sup>th</sup> of the network hash rate will find a valid block
about 50% of the time in less than 50 days---faster than his average
rate (mean). But about 25% of the time, it will take him over 100 days and one
time in a hundred (1%), he will have to mine without reward for over 300
days before finding a valid block---most of that time wondering whether
his equipment is broken.

This spread of probable lengths of time between finding blocks is
called **variance.** As hash rate increases linearly, variance decreases
exponentially, so a miner with twice as much hash rate has four times
less variance. This means a miner with twice as much hash rate gets
paid (on average) twice as often---as you'd expect---but also four times
more consistently.

![The Variance Of An Average (1/10,000) Miner Miners 2x, 4x, And 8x Faster](/img/mining/en-variance-comparison.svg)

(Don't confuse the distribution graph above with progress. There is
no such thing as being a certain percent of the way towards finding
a block. Even a miner who waits a million days might not find a
valid block---because finding blocks is random. The distribution
just tells us how likely it is a miner will find a block within a
certain amount of time.)

Small miners who want more consistent payments (less variance) often
pool their hashing with other small miners to solve blocks together
and split the reward, creating **mining pools** with much hash rate and
little variance.





### Shares

In a pool, not all miners have the same hash rate, so they use Bitcoin's
proof-of-work mechanism to allow each miner to prove how much work they did.

In Bitcoin, a proof of work is a block with a hash (random number) below
a certain target. For example, imagine choosing random numbers between 0
and 99. Ten percent of the time (on average), a random number will be
below a target of 10, and one percent of the time (on average), a
random number will be below a target of 1.

More usefully, ten percent of the random numbers below 10 will also be
below 1 (on average). Pools use this math to allow miners to prove they
did a share of the work even when they don't find valid blocks. In this
example, the pool target is 10 and the network target is 1, so we
can say there are (on average) 10 **"shares"** for every valid block and
each share is worth 1/10<sup>th</sup> of a block.

![The Simulated Distribution Of 100 Random Numbers Showing Blocks, Shares, And Invalid Blocks](/img/mining/en-shares.svg)

Every time a miner finds a share with a hash number below the pool
target, he submits it to the pool. Most of these shares will be invalid
blocks because they're above the network target, but the pool gives the
miner credit for the proof of work they demonstrate. When the miner
submits a share which is a valid block, the pool gives the miner credit
for it as a share and then forwards the block to the network so it gets
added to the block chain. The reward that block earns is then split
among the pool members in proportion to the number of shares (proofs of
work) they submitted.

Recall from the Pooling section above that variance decreases
exponentially as frequency increases linearly, so miners who receive 10
shares for every block they create have 100 times less payment variance.
However, pools cannot profitably pay for shares until a proportionate
number of blocks have been created, so most pools don't pay every share
for the full value of work it demonstrates---instead they use some sort
of payment adjustment formula that reduces or delays some payments.

**Resources:** although somewhat dated, Meni Rosenfeld's [Analysis of
Bitcoin Pooled Mining Reward Systems][] remains an excellent detailed
description of pool payment formulas.  The Bitcoin Wiki has a [simple
overview of the formulas][], and the [Mining Pools Subform][] on
BitcoinTalk has posts describing all popular pools in detail.

[Analysis of Bitcoin Pooled Mining Reward Systems]: https://bitcointalk.org/index.php?topic=32814.0
[simple overview of the formulas]: https://en.bitcoin.it/wiki/Comparison_of_mining_pools
[Mining Pools Subform]: https://bitcointalk.org/index.php?board=41.0


### Decentralized Mining

There are different ways of participating in a pool. Some miners
don't run a full node such as Bitcoin core but instead
slave their mining equipment to a pool server, trusting that their
equipment will be used honestly to generate new blocks. This trust is
sometimes misplaced, leading to the equipment being used to perform
double spend fraud.  

![Mining Only What The Pool Server Requests (Centralized Mining)](/img/mining/en-centralized-mining.svg)

Other miners also want to join a pool for the reduced variance, but
they're not willing to risk participating in an [attack][section attacks] that can
reduce user trust in the Bitcoin mining process and lower bitcoin
prices. Instead, these miners start up a full node so that they can
perform one of the decentralized mining methods described below:

* **[Solo mining][section solo mining]:** The opposite of pool mining, solo mining is the
  simplest form of decentralized mining but also has the highest
  variance of any type of mining, so it is rarely a good option for
  small-scale miners.

* **[P2Pool][section p2pool]:** requires one additional software
  installation over solo mining and greatly reduces variance, so it is
  an excellent option for all miners. In addition, some people donate
  bitcoins to P2Pool miners as a thanks for helping prevent double spend
  attacks, increasing miner income.

* **[GetBlockTemplate][section getblocktemplate]:** can allow you to join certain
  pools and still build your own blocks in a decentralized mode,
  reducing variance without letting someone else make choices for you.
  However, instructions describing how to use that mode with standard
  mining software are not available as of this writing.



#### Solo Mining

Although rarely done today, **solo mining** is done by miners who
attempt to find blocks on their own using just decentralized full node
software such as Bitcoin Core.

![Creating Your Own Blocks With Solo Mining (Decentralized Mining)](/img/mining/en-solo-mining.svg)

Unless you control hundreds or thousands of bitcoins worth of mining
equipment, solo mining has very high variance, so you might have to wait
months or years before finding a block.  P2Pool, described below, is
almost certainly a better option for most miners.



#### P2Pool

P2Pool is a decentralized mining
pool that reduces variance but still lets miners build their own blocks
using data from their own full nodes.

P2Pool keeps track of pool shares in a decentralized way by building an
alternative block chain called the share chain. New shares are added to
the share chain on average every 30 seconds instead of Bitcoin's every
10 minutes. Occasionally one of these shares is also a valid
block for the Bitcoin block chain.

![Comparison Of The Bitcoin Block Chain And P2Pool Share Chain](/img/mining/en-share-chain-block-chain.svg)

To use P2Pool, you run the P2Pool open source software along with a full
node such as Bitcoin Core. The P2Pool program can then create block
templates using data from your full node, send the template to your
mining software, and return the shares and blocks you find to the P2Pool
and Bitcoin decentralized networks.

![Peer-To-Peer Creating Your Own Blocks (P2Pool Decentralized Mining)](/img/mining/en-p2pool-decentralized-mining.svg)

Variance for P2Pool miners is reduced significantly, not only because
shares are created 20 times as often as blocks but also because P2Pool
miners are only competing against other P2Pool miners to create shares.

For example, recall our imaginary "average" miner from the [Pooling][section pooling]
section who does 1/10,000<sup>th</sup> of the work on the Bitcoin network and so
has to wait about 70 days on average to create a block. If there are 400
of these average miners on P2Pool, they'll each individually create a
share about every 3.4 hours and collectively create a valid block about every
4.2 hours---which is much preferable to waiting 70 days on average.

<!-- Math for shares: 400 equal miners divided by 2 shares per minute
divided by 60 minutes per hour. Math for blocks: 1/6 hours per block
divided by 400/10,000ths (4%) of network hash rate. -->

However, very small miners might still encounter high variance in share
creation. Large P2Pool miners can optionally increase their variance
slightly to significantly decrease variance for smaller P2Pool miners
without changing how much each miner earns on average. It has been
proposed that if P2Pool grows too big for small miners, it can split
into several different decentralized networks so that all miners can
obtain low variance.

A number of people in the Bitcoin community support P2Pool's
decentralized mining by contributing bitcoins to P2Pool miners based on
the amount of work each miner has recently done. This has lead many
P2Pool miners to report that they made more money mining on P2Pool than
if they had mined in any other way.

**Resources:** The [P2Pool home page][] has instructions for getting
started and the Bitcoin Wiki has a more [detailed description of
P2Pool][] along with [instructions for donating to P2Pool miners][]
(requires running a P2Pool node, which you can do without mining).

[P2Pool home page]: http://p2pool.in/
[detailed description of P2Pool]: https://en.bitcoin.it/wiki/P2Pool
[instructions for donating to P2Pool miners]: https://en.bitcoin.it/wiki/P2Pool#Donating_to_P2Pool_miners



#### GetBlockTemplate

The GetBlockTemplate (GBT) mining data protocol supported by some mining
pools allows for both centralized and decentralized mining.

Pool servers using GetBlockTemplate send to each miner all of the
data required to create a valid block for that pool, allowing the
miner to inspect the data for double spend attempts. Miners can also
perform decentralized mining by getting transactions from their own full
node, such as Bitcoin Core, and using those transactions instead of the
optional transactions in the template.

![Evaluating Pool Requests And Creating Your Own Blocks (Decentralized Mining)](/img/mining/en-decentralized-mining.svg)

Unfortunately, as of this writing, no mining software takes full
advantage of what GetBlockTemplate offers for decentralized mining.






## Income And Expenses

The income source most people associate with mining is the new block
reward, currently valued at 25 bitcoins for each new block mined. This
reward halves approximately every four years (210,000 blocks); it is
expected to reduce to 12.5 bitcoins around the middle of 2016.

Closely related are the transaction fees a miner collects from
transactions included in a block.  These vary over time and by miner
policy, but they have so far generally been less than one bitcoin for
each block mined.

In addition, there are several non-financial rewards:

* **Help/Hurt Bitcoin:** People who want to see Bitcoin succeed can [choose to mine honestly][section choose to be honest] to
  improve transaction security. On the other hand, people who want to
  see Bitcoin fail can also mine, deliberately using their hashes to try
  to make transactions less reliable.

* **Voting Rights:** Miners can use their hash rate to easily vote on whether to allow or
  discourage changes to some parts of the Bitcoin network. For example,
  miners voted in 2012 to allow a new transaction type. Although
  non-miners can also influence Bitcoin decision making, they generally
  must take time to establish a reputation in the community and then
  advocate for the decision they want.

* **Anonymous Income:** Mining can be as anonymous as it is possible to be when using the
  Internet. If a miner uses privacy technology correctly, and if that
  technology works as expected, a miner may be able to earn bitcoins
  which cannot be traced back to the miner.  (The miner must also use
  privacy protection when spending the coins.)

People who desire the non-financial rewards may be willing to mine at
smaller profit margins or even at a loss, making it more difficult for
profit-seeking miners to compete with them.

![Warning icon](/img/icon_warning.svg)
**Rough Guesses Only:** the formulas in the following subsections are not always
the most precise formulas available. We selected less precise formulas
when they were simpler, so you can use them more easily. That doesn't
mean more precise formulas will give you better results---with bitcoin
prices and other key factors changing often, no mining revenue formula
can provide you with anything better than rough guesses. *Use these
formulas (or any others) at your own risk.*

### Base Income

As of this writing, miners tend to spend most of their money on
equipment whose performance is measured in how many hashes per second
(H/s) it produces. For convenience, hash rates are usually reported in
gigahashes (GH/s), terahashes (TH/s), or petahashes (PH/s):

GH/s | 1 billion H/s   | 10<sup>9</sup> H/s
TH/s | 1 thousand GH/s | 10<sup>12</sup> H/s
PH/s | 1 thousand TH/s | 10<sup>15</sup> H/s

Mining is a lottery, so your equipment competes against everyone elses'
equipment. That means, for new equipment, you need to know how many
hashes per second everyone elses' equipment will produce at the time you
start using your equipment. 

There's no way to predict the future network hash rate, but you can make
a guess. As of this writing, network hash rate typically increases by
about 0.5% to 3.0% a day---meaning a piece of equipment is about 0.5% to
3.0% less competitive each day.

Using the calculator below, we can see that 10.0 TH/s of mining
equipment which will be delivered in thirty days is equivalent to having
7.4 TH/s of mining equipment today if hash rate increases by 1% a day:

<form class="mining-calculator" id="calc-diff" action="javascript:void(null);" method="post" onSubmit="calculate_todays_terms();">
<table>
<tr>
    <th width="30%">Hash Rate Of Equipment To Buy</th>
    <th>Estimated Difficulty Increase Per Day</th>
    <th>Days Until Equipment Is Operational</th>
    <th>Result:<br/>Hash Rate In Today's Terms</th></tr>
<tr>
    <td><input id="diff_rate" type="number" value="10.0" step="0.1" onpropertychange="calculate_todays_terms();" oninput="calculate_todays_terms();" onkeypress="calculate_todays_terms();" style="width: 70px;" /><select id="diff_multiplier" onchange="calculate_todays_terms()">
        <option value="GH/s">GH/s</option>
        <option value="TH/s" selected="true" >TH/s</option>
        <option value="PH/s">PH/s</option>
    </select></td>
    <td><label><input id="diff_diff_increase" onpropertychange="calculate_todays_terms();" oninput="calculate_todays_terms();" onkeypress="calculate_todays_terms();" step="0.5" type="number" value="1.0" style="width: 50px;"/>%</label></td>
    <td><label><input id="diff_days" onpropertychange="calculate_todays_terms();" oninput="calculate_todays_terms();" onkeypress="calculate_todays_terms();" type="number" step="1" value="30" style="width:70px;" /></label></td>
    <td><label><input id="diff_result" type="text" style="width:200px;" /></label></td>
</tr>
</table>

<p>Spreadsheet formula:
<label><input id="diff_formula" class="mining-formula" type="text" /></label></p>
<p>Formula used: <a href="https://en.wikipedia.org/wiki/Exponential_decay">exponential decay</a>
<a href="#calc-diff" class="calculator-link">Link Here</a></p>

</form>


Once you guess how many hashes per second your equipment will generate
in today's terms, you can estimate how much income that equipment will
earn. To start, get the [current network difficulty][] and multiply it
by 7,158,588 to get the approximate number of hashes per second on the
Bitcoin network.

[current network difficulty]: http://blockexplorer.com/q/getdifficulty

You can calculate your initial share of the hash rate by dividing your
equipment's hash rate in TH/s by the current network hash rate in TH/s.
For example, if network difficulty is 8,853,416,309 and your equipment's
hash rate is 7.4 TH/s in today's terms, you will control about 0.0001 of
the network hash rate---1/100<sup>th</sup> of a percent.

<form id="calc-percent" class="mining-calculator" action="javascript:void(null);" method="post" onSubmit="calculate_percent();">
<table>
<tr>
    <th width="30%">Your Hash Rate In <a href="#calc-diff">Today's Terms</a></th>
    <th>Network Difficulty<br/><a href="http://blockexplorer.com/q/getdifficulty">(Get Current Value)</a></th>
    <th>Result:<br/>Your Share Of The Network Hash Rate</th></tr>
<tr>
    <td><input id="percent_rate" type="number" value="7.408" step="0.1" style="width: 70px;" onpropertychange="calculate_percent();" oninput="calculate_percent();" onkeypress="calculate_percent();"/><select id="percent_multiplier" onchange="calculate_percent()">
        <option value="GH/s">GH/s</option>
        <option value="TH/s" selected="true" >TH/s</option>
        <option value="PH/s">PH/s</option>
    </select></td>
    <td><input id="percent_difficulty" type="number" value="8853416309"  step="1000000000" style="width: 180px;" onpropertychange="calculate_percent();" oninput="calculate_percent();" onkeypress="calculate_percent();"/></td>
    <td><input id="percent_result" type="text" style="width: 90px;"/> or<br/><input id="percent_percent"
    type="text" style="width:90px;"/></td>
</tr>
</table>

<p>Spreadsheet formula:
<label><input id="percent_formula" type="text" class="mining-formula" /></label></p>
<p>Learn more on the Bitcoin Wiki about <a href="https://en.bitcoin.it/wiki/Difficulty">difficulty</a>
<a href="#calc-percent" class="calculator-link">Link Here</a></p>

</form>



<!-- TODO: maybe a jekyll plugin to grab current difficulty at site build time. -->

Each block (as of this writing) is worth at least 25 bitcoins, which
means your average reward per block is about 25 bitcoins times your rate, or
about 0.0025 bitcoins per block in the example described above. There
are about 1,008 blocks a week, so your average income in this example
would be about 2.5 bitcoins a week until difficulty rises.



### Difficulty

Every 2,016 blocks, Bitcoin adjusts how difficult it is to find a block,
increasing the difficulty when the network hash rate increases and
decreasing it when the rate decreases. In 2009, difficulty mostly
stayed the same; ever since, it has almost always gone up.

Every increase in difficulty makes your mining equipment that much less
competitive, reducing your mining income. Although you can look at a
[table of past difficulty changes][], all you can do is guess about
future changes.

[table of past difficulty changes]: https://bitcoinwisdom.com/bitcoin/difficulty

Because guesses are very likely to be inaccurate, you should always make
several guesses to see how they compare. If you know about how many
bitcoins you'll make in a week at current rates, about how much
difficulty increases in an average week, and how many weeks into the
future you want to guess, you can approximate your weekly income at a
certain time.

For example, if you make 1 bitcoin a week now and you expect difficulty
to rise by about 5% a week on average, you will only earn 0.074 bitcoins
in week 52. The plot below shows the amount of money you would make each
week if difficulty increases by 5%, 10%, or 15% a week.

![Exponential Decay Of Mining Revenue From Difficulty Increases](/img/mining/en-mining-equipment-exponential-decay.svg)

The formula used above, and in the calculator below, models difficulty
changes as continuous even though they really occur only every 2,016
blocks. This keeps the formula simple but means it may produce a number
that is a few percent higher or lower than reality, depending mostly
upon how close you are to a 2,016-block boundary when you start mining.

A more useful number is how much income you might make over the
lifetime of your mining equipment. We use a formula that adds the
bitcoins you make in the first week to the slightly fewer bitcoins you
make in the second week to the even fewer bitcoins you make in the
third week, and so on.

For example, if difficulty increases by 5% a week and you start out
competitive enough to make 1 bitcoin a week, you will make just under 19
bitcoins in 52 weeks.
 
<form id="calc-income" class="mining-calculator" action="javascript:void(null);" method="post" onSubmit="calculate_income();">
<table>
<tr>
    <th>Starting Income Per Week In Bitcoins</th>
    <th>Number Of Weeks</th>
    <th>Estimated Difficulty Increase Per Week</th>
    <th>Result:<br/>Total Estimated Income In Bitcoins</th></tr>
<tr>
    <td><input id="income_rate" type="number" value="1.00"  step="0.1" style="width:70px;" onpropertychange="calculate_income();" oninput="calculate_income();" onkeypress="calculate_income();"/></td>
    <td><input id="income_weeks" type="number" value="52"  step="1" style="width:40px;" onchange="calculate_income()"
    onpropertychange="calculate_income();" oninput="calculate_income();" onkeypress="calculate_income();"/></td>
    <td><label><input id="income_diff_increase" type="number" value="5" step="1" style="width:40px;" onpropertychange="calculate_income();" oninput="calculate_income();" onkeypress="calculate_income();"/>%</label></td>
    <td><label><input id="income_result" style="width:140px;" type="text" /></label></td>
</tr>
</table>

<p>Spreadsheet formula:
<label><input id="income_formula"  class="mining-formula" type="text"/></label></p>
<p>Formulas used: <a href="https://en.wikipedia.org/wiki/Exponential_decay">exponential decay</a> and <a
href="https://en.wikipedia.org/wiki/Geometric_progression">geometric progression</a>
<a href="#calc-income" class="calculator-link">Link Here</a></p>

</form>

Here's a plot similar to the plot above showing total income with the
same 5%, 10%, and 15% guesses about difficulty increases:

![Geometric Progression Of Total Revenue From Mining With Exponential Decay Figured In](/img/mining/en-mining-equipment-profit-progression.svg)

### Equipment Costs

Even more useful is plotting your total return on investment, which
requires factoring in costs. For example, let's say that you spend 5
bitcoins to buy that mining equipment. We repeat the same plot from the
subsection above but start at negative five bitcoins instead of zero.

![Mining Equipment Return Of Investment (ROI) For An Imaginary 5 BTC Of Mining Equipment](/img/mining/en-mining-equipment-roi.svg)

Any delay in getting started mining has a disproportionate effect on
your earnings. For example, using the same parameters as before, the
illustration below shows that a seemingly minor two week delay in
getting started costs you about 1.95 bitcoins---over a third of the cost
of the mining equipment in this imaginary example.

![A Two Week Delay In Getting Started Costs Almost 2 BTC In This Example](/img/mining/en-mining-equipment-roi-delay.svg)

In addition to equipment costs, there may be other start-up costs, such
as the cost of the time required to set up your equipment. Many home
miners do not assign a monetary value to their time, so we won't either.

### Electrical Costs

For some miners, a major factor in mining is the cost of the electricity
to run the mining equipment. You can estimate the cost of electricity by
getting the following information: the cost of a kilowatt hour (kWh) to
your location in your local currency, the price of bitcoins in your
local currency, and the number of watts used by the mining equipment you
plan to buy.  

Multiply the mining equipment's watts by 168 (hours in a week) and
divide by 1,000 to get the number of kilowatt hours you use. For
example, a 3,000 watt collection of mining equipment uses 504 kWh a
week. Multiply this number by cost you pay for a kWh and divide by the
price of bitcoins in your local currency. For example, the author of
this paragraph pays $0.15 USD per kWh and currently about $600 USD per
bitcoin, so a 3,000 watt collection of equipment would cost him about
0.126 bitcoins a week to run.

<form id="calc-electricity" class="mining-calculator" action="javascript:void(null);" method="post" onSubmit="calculate_electricity();">
<table>
<tr>
    <th>Watts Used By Equipment</th>
    <th>Price Per Kilowatt Hour (kWh)</th>
    <th>Price Per Bitcoin</th>
    <th>Result:<br/>Electricity Price Per Week In Bitcoins</th></tr>
<tr>
    <td><input id="electricity_watts" type="number" value="3000" step="100" style="width:60px;" onpropertychange="calculate_electricity();" oninput="calculate_electricity();" onkeypress="calculate_electricity();"/></td>
    <td><input id="electricity_price_kwh" type="number" value="0.15" step="0.01" style="width:60px;" onpropertychange="calculate_electricity();" oninput="calculate_electricity();" onkeypress="calculate_electricity();"/></td>
    <td><input id="electricity_price_btc" type="number" value="600" step="50" style="width:60px;"  onpropertychange="calculate_electricity();" oninput="calculate_electricity();" onkeypress="calculate_electricity();"/></td>
    <td><label><input id="electricity_result" type="text" style="width:120px;" /></label></td>
</tr>
</table>

<p>Spreadsheet formula:
<label><input id="electricity_formula"  type="text" class="mining-formula" /></label></p>
<p>See Wikipedia's <a
href="https://en.wikipedia.org/wiki/Electricity_pricing#Global_electricity_price_comparison">table
of global electrical prices</a>
<a class="calculator-link" href="#calc-electricity">Link Here</a></p>

</form>



Using the 5% increase in weekly network hash rate from before, the
illustration below subtracts the cost of electricity from the daily
profits. 

![The Effect Of Adding Electrical Costs To The ROI Calculation](/img/mining/en-mining-equipment-roi-electricity.svg)

As you can see, electrical costs not only make mining less profitable
but they can even make mining unprofitable with a particular piece of
equipment after the network hash rate increases significantly.

### Cooling Costs

Almost all of the electricity used by mining equipment is immediately converted to
heat. You must get rid of any excess heat. Some mining hardware can be
cooled without extra equipment, but you usually need a fan or something
more complicated, so be sure to add the cost of cooling equipment to
your initial investment costs.

Removing waste heat from the mining equipment adds it to the air around
the equipment. This can reduce the amount of other heating you need on
cold days and increase the amount of cooling you need on hot days.

Locations with regular cold weather typically have more cost effective
ways to generate heat than electrical heating, so the reduction in
required heat due to mining may not be significant.

On the other hand, modern air conditioning ([a heat pump][])
tends to use about 0.67 watts of electricity for every 1.00 watts you
use mining.  Adding full-time air conditioning costs to our
illustration of imaginary situations shows a significant effect on
profitability.

![The Effect Of Adding Cooling Costs To The Electrical Costs In The ROI Calculation](/img/mining/en-mining-equipment-roi-electricity-cooling.svg)

[a heat pump]: https://en.wikipedia.org/wiki/Heat_pump

Some people may know how much they pay for heating or cooling, but very
few people know how efficient their equipment or location is, so we
didn't make a calculator. Instead, simply try to avoid mining in air
conditioned rooms. (But don't let heat build up to unsafe levels.)

### Pool Costs

Mining in a pool can reduce your variance, giving you a more steady
income, but it can also add to your costs.

**Pool Fee:** The most direct of these costs is the pool fee. As of this
writing, pool fees are typically from 0% to 5% plus (sometimes) part or
all of the transaction fees in a block.   Whatever is left is paid to
miners according to the pool's share reward formula.  (See the [Shares
section][section shares] for more details.)

**Skimming:** If a pool doesn't charge any fees or survive based on
donations, you should investigate how they make their money. Some pools
can easily steal small percentages of income from their miners, called
skimming, without miners being able to tell the difference between theft
and normal variance.

**Block Withholding:** Pool miners can lose income when they combine
work with dishonest miners. Pool miners get paid on the assumption that
they’ll submit every share they make---including the shares which are
also valid blocks---but a miner who wants to defraud the pool can submit
every share he creates except the valid blocks, called block
withholding.

The attacking miner doesn't earn any direct income from this attack, but
everyone in the pool (including the attacker) loses their share of that
withheld block. This averages out over time to the amount of pool hash
rate controlled by the attacker, so an attacker with 5% of the pool's
hash rate can reduce everyone elses' income by 5%. (The attacker reduces
his own income by slightly more than 5%, but can keep the remaining
nearly 95%.)

Pools can't prevent block withholding attacks, so the only guaranteed
defense is to avoid all pools (even P2Pool). However, some pools (such
as P2Pool) pay miners a little extra for submitting a block to encourage
good behavior. Other pools analyze each miner's statistics and punish
miners who don't submit enough blocks for their hash rate.




### Legal Costs

Bitcoin.org does not provide legal advice, but we do recommend that you
discuss the following considerations with a legal expert to ensure you
follow the law:

* **Permitting:** Is mining legal in your area? Does it require you spend time and money
  to get a license or permit?

* **Zoning:** Is mining considered a business, and are there any special rules about
  businesses in your area? For example, some areas may forbid running a
  business in your home, so you will have to rent commercial space.

* **Taxes:** Do you have to pay taxes on mining income?



### Compounding

Whenever bitcoin prices change, there can be a compounding effect on
your profits or loses. When bitcoin prices go up, you can sell or spend
the bitcoins you earn for more value, and you also have to pay less in
bitcoin amounts for expenses priced in your local currency, such as
electricity. But when bitcoin prices go down, the opposite holds true:
you earn less and your expenses in local currency become relatively more
expensive.

Extending our example plot from the [Electrical Costs][section electrical costs] subsection
above, if bitcoins start off worth $500 USD and you pay $50 USD per week
for electricity, the green plot below shows your profits in USD with
bitcoin prices increasing by 2% per week and the red plot shows your
profits with bitcoin prices decreasing by 2% per week. For easy
comparison, we assume you sell or spend your bitcoins as soon as you
earn them. As with previous charts, we also assume network hash rate
increases by 5% a week.

![Compound Gains Or Losses From A +2% or -2% Weekly Price Change](/img/mining/en-mining-equipment-compounding.svg)

Taking advantage of compounding is one of the top reasons people invest
in mining. Compare the Return On Investment (ROI) from our 5 bitcoins of
imaginary mining equipment against the ROI from simply holding those
5 bitcoins if bitcoin prices start at $500 USD and rise 2% a week:

![The Difference In Investing In Mining Vs. Investing In Bitcoins With Our Imaginary Equipment](/img/mining/en-mining-equipment-alternative.svg)

Compounding only works in a miner's favor if prices rise. A weekly rise
of 2% would be extraordinary compared to other investments, but some
amount of price increase is likely if users increasingly trust the
mining process to keep Bitcoin safe and reliable. However, compounding
hurts miners if prices fall, which is also likely if user trust is lost.
The section below about [choosing to mine honestly][section choose to
be honest] describes how miners can
keep Bitcoin safe and reliable to encourage price increases.





### Scams

Bitcoin mining is the subject of frequent scams. We use a broad
definition of scam that includes anything ethically questionable or
financially foolish.

**Delays:** Possibly the most frequently-reported scam is a mining equipment
manufacturer or reseller which accepts preorders but does not
deliver its equipment at the promised time. As shown in the
[Equipment Costs][section equipment costs] subsection, even a small delay in delivery can
significantly reduce profits.

**Competing With The Customer:** Another often reported scam is burn-in
mining. Some mining equipment manufactures "test" their equipment by
mining bitcoin before they send that equipment to their customers. The
bitcoins they earn from mining are not sent to the customers, putting
the manufacturer in direct competition with its customers and possibly
encouraging it to make its customers less effective miners.

Both of the problems above can be mostly avoided by researching the
reputation of the businesses you buy equipment from.  The BitcoinTalk
[Mining Hardware Subforum][] is a good place to start.

[Mining Hardware Subforum]: https://bitcointalk.org/index.php?board=76.0

**Cloud Mining:** Some "cloud mining" companies sell contracts or
investments offering to pay you for every block their mining hardware
helps find. These contracts are usually tied to a certain number of
hashes per second, so the more the network hash rate increases, the less
income you receive for each block found---the same as buying mining
equipment for yourself.

It's useful to wonder why these companies are trying to sell you a
contract. The equipment runs in their facility, so it will earn exactly
the same amount of profit whether you buy the hashes or they keep the
hashes for themselves.  But if they really expect those hashes to result
in profit, why are they selling them in the first place?

It can be argued that they need your money to buy more hardware so that
they can take advantage of [economies of scale][], but large scale
mining operations can perform the [attacks described above][section
attacks], which
makes Bitcoin mining less effective at protecting recent transactions.

It's also easy to create a [Ponzi scheme][] out of such a contract where
the company doesn't actually do any mining but instead slowly pays you
back the money you invested. Even companies which do some mining can run
partial Ponzi schemes this way for extended periods of time until they
decide they have enough investments to steal or run out of money, so it's
difficult to tell which cloud mining companies are legitimate.

In short, cloud mining may be a poor investment, bad for the network,
or an outright scam.

[economies of scale]: https://en.wikipedia.org/wiki/Economies_of_scale
[Ponzi scheme]: https://en.wikipedia.org/wiki/Ponzi_scheme








## Choose To Be Honest

Miners can choose whether to use their mining equipment to help protect
bitcoins or to try to steal them. For a single miner with less than
about 1% of the network hash rate, the choice is easy---the chance of a
successful double spend theft is tiny and the costs are high, so honesty
is the only reasonable choice.

But miners have a third option: they can let a pool operator choose for
them. When a pool operator can make choices for hundreds or thousands of
miners at once, the incentives change---honesty is no longer the only
reasonable choice.

![The Cost In Sacrificed Income Of A Double Spend Attack On A Confirmed Transaction](/img/mining/en-confirmed-double-spend-cost.svg)

With control over 1% or more of the network hash rate, operators of
large pools, mining farms, and cloud mining services can try to steal
from merchants who accept transactions confirmed once. With more than
15%, they can try the same attack against transactions confirmed six
times. Because they're backed by a significant hash rate, these attacks
have a reasonable chance of succeeding.

![The Difference Between Compound Gains Of +2%/Week And Compound Loses Of -2%/Week](/img/mining/en-mining-equipment-compounding.svg)

What happens when an operator chooses to steal thousands of bitcoins? We
can only imagine, but if the fallout includes a drop in bitcoin prices,
miners in particular are likely to be hurt due to [compound loses][section
compounding].

On the other hand, we can also imagine that some people are unwilling to
accept or hold bitcoins today because of this double spend risk.  If the
risk is reduced, demand for bitcoins may go up, allowing miners in
particular to benefit due to compound gains.

To avoid loss and possibly increase gains---not just for miners but for
everyone who owns bitcoins---Bitcoin.org strongly encourages all miners
to choose to mine honestly.

To learn how miners can make their own choices and also enjoy the
low variance of pooled mining, please see the [Decentralized Mining
section][section decentralized mining].

*Would you like to help write documentation about decentralized mining?
If so, please subscribe to the [Bitcoin Documentation mailing list][] to
volunteer.*

[Bitcoin Documentation mailing list]: https://groups.google.com/forum/#!forum/bitcoin-documentation

[section how it works]: #theory
[section record keeping]: #record-keeping
[section bitcoin lottery]: #bitcoin-lottery
[section proof of work]: #proof-of-work
[section the block chain]: #the-block-chain
[section attacks]: #attacks
[section majority attack]: #majority-attack
[section lucky attack]: #lucky-attack
[section tools and techniques]: #tools-and-techniques
[section hardware and software]: #hardware-and-software
[section pooling]: #pooling
[section shares]: #shares
[section decentralized mining]: #decentralized-mining
[section solo mining]: solo-mining
[section p2pool]: #p2pool
[section getblocktemplate]: #getblocktemplate
[section income and expenses]: #income-and-expenses
[section base income]: #base-income
[section difficulty]: #difficulty
[section equipment costs]: #equipment-costs
[section electrical costs]: #electrical-costs
[section cooling costs]: #cooling-costs
[section pool costs]: #pool-costs
[section legal costs]: #legal-costs
[section compounding]: #compounding
[section scams]: #scams
[section choose to be honest]: #choose-to-be-honest

</div>
<script>updateToc();</script>
<script>addAnchorLinks();</script>

<script type="text/javascript">
function calculate_todays_terms() {
    if(window.event&&window.event.type=='propertychange'&&window.event.propertyName!='value')return;
    var diff_form = document.forms["calc-diff"];
    var rate = diff_form.diff_rate.value;
    var multiplier = diff_form.diff_multiplier.value;
    var diff_increase = diff_form.diff_diff_increase.value;
    var days = diff_form.diff_days.value;
    var answer = "" + (rate*Math.exp(-diff_increase/100*days)).toFixed(3) + " " + multiplier;
    diff_form.diff_result.value = answer;
    diff_form.diff_formula.value = "=" + rate + "*exp(-" + diff_increase/100 + "*" + days + ")";
}


function calculate_percent() {
    if(window.event&&window.event.type=='propertychange'&&window.event.propertyName!='value')return;
    var hashes_per_sec={"GH/s" : 9, "TH/s" : 12, "PH/s" : 15};
    var percent_form = document.forms["calc-percent"];
    var rate = percent_form.percent_rate.value;
    var difficulty = percent_form.percent_difficulty.value;
    var multiplier = hashes_per_sec[percent_form.elements["percent_multiplier"].value]
    var answer = (rate*Math.pow(10,multiplier)/(difficulty*7158588)).toFixed(5);
    percent_form.percent_result.value = answer;
    percent_form.percent_percent.value = "" + (answer*100).toFixed(3) + "%";
    percent_form.percent_formula.value = "=" + rate + "*10^" + multiplier + "/(" + difficulty + "*7158588)";
}
 

function calculate_income() {
    if(window.event&&window.event.type=='propertychange'&&window.event.propertyName!='value')return;
    var income_form = document.forms["calc-income"];
    var rate = income_form.income_rate.value;
    var weeks = income_form.income_weeks.value;
    var diff_increase = income_form.income_diff_increase.value / 100;
    var answer = (rate*(1-Math.exp(-diff_increase*weeks))/(1-Math.exp(-diff_increase))).toFixed(8);
    income_form.income_result.value = answer;
    income_form.income_formula.value = "=" + rate + "*(1-exp(-" + diff_increase + "*" + weeks + "))/(1-exp(-" + diff_increase + "))";
}


function calculate_electricity() {
    if(window.event&&window.event.type=='propertychange'&&window.event.propertyName!='value')return;
    var electricity_form = document.forms["calc-electricity"];
    var watts = electricity_form.electricity_watts.value;
    var price_kwh = electricity_form.electricity_price_kwh.value;
    var price_btc = electricity_form.electricity_price_btc.value;
    var answer = (watts * price_kwh / price_btc * 168 / 1000).toFixed(6);
    electricity_form.electricity_result.value = answer;
    electricity_form.electricity_formula.value = "=" + watts + "*" + price_kwh + "/" + price_btc + "*168/1000";
}

calculate_todays_terms();
calculate_percent();
calculate_income();
calculate_electricity();
</script>

