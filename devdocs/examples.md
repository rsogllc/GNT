---
# This file is licensed under the MIT License (MIT) available on
# http://opensource.org/licenses/MIT.

layout: base
lang: en
id: developer-examples
title: "Developer Examples - Bitcoin"
breadcrumbs:
  - bitcoin
  - dev docs
  - Examples
end_of_page: |
  <script src="/js/jquery/jquery-1.11.2.min.js"></script>
  <script src="/js/jquery/jquery-ui.min.js"></script>
  <script src="/js/devsearch.js"></script>
  <script>updateToc();</script>
---
<link rel="stylesheet" href="/css/jquery-ui.min.css">

# Bitcoin Developer Examples

<p class="summary">Find examples of how to build programs using Bitcoin.</p>

<div markdown="1" id="toc" class="toc"><div markdown="1">

* Table of contents
{:toc}

<ul class="goback"><li><a href="/en/developer-documentation">Return To Overview</a></li></ul>
<ul class="reportissue"><li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/issues/new" onmouseover="updateIssue(event);">Report An Issue</a></li></ul>
<ul class="editsource"><li><a href="https://github.com/bitcoin-dot-org/bitcoin.org/tree/master/_includes" onmouseover="updateSource(event);">Edit On GitHub</a></li></ul>

</div></div>
<div markdown="1" class="toccontent">

{% include_relative _includes/devdoc/fragment_reviews_needed.md %}

<input id="glossary_term" class="glossary_term" placeholder="Search the glossary, RPCs, and more">

{% include_relative _includes/devdoc/example_intro.md %}

{% include_relative _includes/devdoc/example_testing.md %}

{% include_relative _includes/devdoc/example_transactions.md %}

{% include_relative _includes/devdoc/example_payment_processing.md %}

{% include_relative _includes/devdoc/example_p2p_networking.md %}

{% include_relative _includes/references.md %}
{{site.glossary_links}}

</div>
