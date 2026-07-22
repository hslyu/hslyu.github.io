---
layout: page
hide-header: true
numbered-lists: true
---

## Domestic papers

<ol class="compact-publications numbered-content-list">
{% for item in site.data.miscellaneous.domestic_papers %}<li><strong>{{ item.title }}</strong><br><span>{% include formatted-authors.html authors=item.authors %} · <em>{{ item.venue }}</em>, {{ item.year }}{% if item.note %} · {{ item.note }}{% endif %}</span></li>{% endfor %}
</ol>

## Intellectual properties

### Patents

<ol class="patent-list compact-publications numbered-content-list">
{% for item in site.data.miscellaneous.patents %}<li><div class="publication-list-content"><strong>{{ item.title }}</strong><span class="patent-authors">{% include formatted-authors.html authors=item.authors %}</span><span class="patent-info">{{ item.info }}</span></div></li>{% endfor %}
</ol>

### Software

<ol class="numbered-content-list">
<li><div class="publication-list-content">{% include formatted-authors.html authors="Hyeonsu Lyu" %}, “고정익 기지국 커버리지 최대화를 위한 다중 에이전트 강화학습 프로그램,” C-2022-052119.</div></li>
<li><div class="publication-list-content">{% include formatted-authors.html authors="Hyeonsu Lyu" %}, “무인항공기 기지국 트리 탐색 기반 경로 계획 및 자원 관리 기술을 위한 프로그램 코드,” C-2022-036997.</div></li>
<li><div class="publication-list-content">{% include formatted-authors.html authors="Hyeonsu Lyu" %}, “비례 공정성을 고려 드론 기지국의 최적 경로 설정 기법 시각화 프로그램,” C-2021-046121.</div></li>
<li><div class="publication-list-content">{% include formatted-authors.html authors="Hyeonsu Lyu" %}, “모터 고장 상황에서의 비상 착륙 학습 시뮬레이터,” C-2020-043847.</div></li>
<li><div class="publication-list-content">{% include formatted-authors.html authors="Hyeonsu Lyu" %}, “레이더를 이용한 능동형 타겟 감지 드론 통신 기지국 시뮬레이터,” C-2018-037076.</div></li>
<li><div class="publication-list-content">{% include formatted-authors.html authors="Hyeonsu Lyu" %}, “통신과 드론 제어가 통합된 시뮬레이터,” C-2019-034510.</div></li>
</ol>

## Projects

<p class="subsection-label"><strong>Ongoing</strong></p>

<ol class="numbered-content-list">
<li><div class="publication-list-content">Research on Ultra-Reliable Aerial Network Framework Supporting High-Density Urban Air Mobility, 2021–2028. Supported by the MSIT, Korea, under the ITRC support program supervised by the IITP (IITP-2021-0-02048).</div></li>
</ol>

<p class="subsection-label"><strong>Selected projects</strong></p>

<ol class="numbered-content-list">
<li><div class="publication-list-content">Development of Joint Electrical/Mechanical Drone Beamforming Based on Target Detection and Precise Attitude Control, 2018–2022. Supported by IITP grant funded by the Korean government (IITP-2018-0-00958). <a href="https://www.youtube.com/playlist?list=PL5q1DIhtyZHvQWb0DogrOd4uKk8lpbK0">Demo</a> · <a href="https://www.m-i.kr/news/articleView.html?idxno=967355">KAI paper award</a></div></li>
<li><div class="publication-list-content">Development of Artificial Intelligence Scanning Electron Microscope, 2019–2020. Supported by the MOTIE, Korea (20005526). <a href="https://www.youtube.com/watch?v=MvSaoPQvDdo">Demo</a> · <a href="https://www.dongascience.com/news.php?idx=40766">News article</a> · <a href="https://www.cambridge.org/core/journals/microscopy-and-microanalysis/article/robust-deeplearning-based-autofocus-score-prediction-for-scanning-electron-microscope/06DACEF3C48B9CC8C1288475A35C67FA">Paper</a> · <a href="https://ieeexplore.ieee.org/document/9341041">Paper</a></div></li>
</ol>

### Miscellaneous projects

<ol class="numbered-content-list">
<li><div class="publication-list-content">Development of the Next-Generation Spectrum Monitoring Platform Based on Big-Data & AI Technology, 2023–2027. Supported by IITP grant funded by MSIP, Korea (No. 00229541).</div></li>
<li><div class="publication-list-content">Human Action Recognition System Development, 2022. Supported by the Electronics and Telecommunications Research Institute (ETRI).</div></li>
<li><div class="publication-list-content">Development of ICT Core Technologies for Safe Unmanned Vehicles, 2017. Supported by IITP grant funded by MSIT, Korea (No. 2017-0-00067).</div></li>
<li><div class="publication-list-content">Post-MIMO System Research for Massive Connectivity and New Wireless Spectrum. Supported by IITP grant funded by MSIT, Korea (No. 2021-0-00161).</div></li>
<li><div class="publication-list-content">Self-Powered Miniature Nationwide Mobile Position Tracker System Technology. Supported by the MSIT, Korea, under the ITRC support program supervised by the IITP (IITP-2017-0-01635).</div></li>
<li><div class="publication-list-content">Research on Near-Zero Latency Network for 5G Immersive Service. Supported by IITP grant funded by MSIP, Korea (No. 2015-0-00278).</div></li>
</ol>
