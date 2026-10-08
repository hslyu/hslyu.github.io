---
layout: page
permalink: /mobile-preview/
title: Mobile preview
nav: false
sitemap: false
search: false
---

<div class="mobile-review" data-mobile-review>
  <div class="mobile-review-controls">
    <p><strong>미리보기 업데이트 5</strong> · 오른쪽 화면의 헤더 탭을 좌우로 스와이프해 모든 페이지로 이동할 수 있습니다.</p>
    <p>오른쪽 휴대폰 화면에서 모든 헤더 탭을 확인할 수 있습니다. 아래 탭으로 페이지를 바꾸고 이전 디자인과 적용한 디자인을 비교해 보세요.</p>

    <div class="mobile-review-pages" role="group" aria-label="미리 볼 페이지">
      <button type="button" data-review-page="/" aria-pressed="false">About</button>
      <button type="button" data-review-page="/experiences/" aria-pressed="false">Experiences</button>
      <button type="button" data-review-page="/publications/" aria-pressed="true">Publications</button>
      <button type="button" data-review-page="/demos/" aria-pressed="false">Demos</button>
      <button type="button" data-review-page="/miscellaneous/" aria-pressed="false">Miscellaneous</button>
    </div>

    <fieldset class="mobile-review-versions">
      <legend>디자인</legend>
      <label><input type="radio" name="mobile-review-version" value="current"> 이전</label>
      <label><input type="radio" name="mobile-review-version" value="adjusted" checked> 적용안</label>
    </fieldset>

    <label for="mobile-review-width">화면 너비</label>
    <select id="mobile-review-width">
      <option value="320">320px · 작은 휴대폰</option>
      <option value="390" selected>390px · 기본</option>
      <option value="430">430px · 큰 휴대폰</option>
    </select>
    <p class="mobile-review-hint">좁은 화면에서는 사용 가능한 너비에 맞춥니다.</p>
    <a class="mobile-review-open" href="/publications/?mobile-preview=adjusted" target="_blank" rel="noopener">새 창에서 실제 화면 열기 ↗</a>
    <p class="mobile-review-status" role="status" aria-live="polite"></p>

  </div>

  <div class="mobile-review-stage">
    <iframe id="mobile-review-frame" title="모바일 디자인 미리보기" src="/publications/?mobile-preview=adjusted&amp;preview-rev=5"></iframe>
  </div>

  <div class="mobile-review-audit">
    <div class="mobile-review-notes" aria-label="페이지별 검토 결과">
      <section data-review-path="/">
        <h2>About에서 발견한 점</h2>
        <ul>
          <li>소셜 아이콘 줄이 화면을 넘어 좌우 아이콘이 잘립니다. 아이콘을 줄이고 누르는 영역은 44px로 확보했습니다.</li>
          <li>사진 아래 이메일이 약 9px로 작고 글자 크기가 섞여 있습니다. 12px로 통일했습니다.</li>
          <li>사진과 본문 사이 간격, 연구 관심사의 행간을 정리했습니다.</li>
        </ul>
      </section>
      <section data-review-path="/experiences/" hidden>
        <h2>Experiences에서 발견한 점</h2>
        <ul>
          <li>모바일에서 섹션 메뉴가 숨겨져 긴 목록을 탐색하기 어렵습니다. 가로로 넘기는 섹션 메뉴를 표시했습니다.</li>
          <li>날짜·지역과 직함 사이의 큰 공백 때문에 같은 경력의 정보가 분리돼 보입니다. 날짜와 지역을 한 줄로 묶었습니다.</li>
          <li>항목 사이 구분과 제목의 행간을 정리하고 카드 그림자를 완화했습니다.</li>
        </ul>
      </section>
      <section data-review-path="/publications/" hidden>
        <h2>Publications에서 발견한 점</h2>
        <ul>
          <li>연도 이동이 숨겨지고 첫 논문 위에 큰 공백이 있습니다. 연도 메뉴와 페이지 제목을 표시했습니다.</li>
          <li>전체 너비의 색상 배지와 큰 그림이 논문 제목보다 먼저 눈에 들어옵니다. 배지를 내용 너비로, 그림 높이를 128px로 제한했습니다.</li>
          <li>데스크톱에 맞춘 강제 줄바꿈을 해제하고 논문 사이에 구분선을 넣었습니다. 그림을 누르면 원본 이미지를 새 창에서 볼 수 있습니다.</li>
        </ul>
      </section>
      <section data-review-path="/demos/" hidden>
        <h2>Demos에서 발견한 점</h2>
        <ul>
          <li>데모의 한 열 구성과 영상 비율은 모바일에서도 자연스럽습니다.</li>
          <li>페이지 제목을 표시하고 제목·영상 사이 간격과 긴 제목의 행간을 맞췄습니다.</li>
          <li>영상 중앙의 재생 버튼을 44px로 조정해 미리보기 내용을 덜 가리도록 했습니다.</li>
        </ul>
      </section>
      <section data-review-path="/miscellaneous/" hidden>
        <h2>Miscellaneous에서 발견한 점</h2>
        <ul>
          <li>여러 화면에 걸친 프로젝트·논문·특허 목록에 빠른 이동 메뉴가 없습니다. 섹션 메뉴를 모바일에 표시했습니다.</li>
          <li>다음 프로젝트의 연도와 이전 프로젝트 정보가 붙어 보입니다. 항목 간격과 구분선을 추가했습니다.</li>
          <li>긴 과제명과 한글 논문의 줄바꿈을 정리하고 Demo·Paper 링크의 터치 영역을 넓혔습니다.</li>
        </ul>
      </section>
    </div>

    <details class="mobile-review-method">
      <summary>공통 조정과 검토 기준</summary>
      <p>본문은 16px를 유지합니다. 모바일 헤더의 5개 탭은 한 줄로 표시하고 좌우로 넘길 수 있습니다. 검색·색상·테마 버튼도 바로 사용할 수 있습니다. 상단 여백, 메뉴 배경의 비침, 연도·보조 글자의 대비를 조정했습니다. 어두운 모드의 Amber와 소속기관 색상은 같은 색 계열에서 밝기를 높였습니다.</p>
      <p>390px에서 5개 탭을 이미지로 확인하고 320·390·430px에서 가로 넘침과 조작을 점검했습니다. 이는 모바일 사용성 검토이며 전체 접근성 인증은 아닙니다.</p>
      <p>참고: <a href="https://www.w3.org/WAI/WCAG22/Understanding/reflow.html" target="_blank" rel="noopener">WCAG Reflow</a>, <a href="https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" target="_blank" rel="noopener">Target Size</a>, <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" target="_blank" rel="noopener">Contrast</a>. 주요 조작은 44px를 목표로 했으며, WCAG의 최소 크기 기준은 예외 조건을 포함한 24px입니다.</p>
    </details>

  </div>

</div>
