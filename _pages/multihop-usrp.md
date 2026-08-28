---
layout: page
permalink: /demos/multihop-usrp/
title: Multi-hop USRP RF Testbed
nav: false
---

<div class="demo-detail-page">
  <a class="demo-detail-back" href="{{ '/demos/' | relative_url }}" aria-label="Back to Demos">
    <span aria-hidden="true">←</span> Back to Demos
  </a>

  <p class="demo-detail-lead">
    This demo presents a multi-USRP wireless testbed that separates network management, high-rate radio data, and timing synchronization before measuring end-to-end RF latency.
  </p>

  <section class="demo-detail-section">
    <h2>1. RF Testbed</h2>
    <p>
      Multiple USRP N320 radios, a Cisco Layer-3 switch, a host computer, and RF measurement equipment form the experimental platform. The setup supports coordinated multi-node transmission and reception while keeping equipment control separate from the radio-data path.
    </p>
    <div class="demo-detail-comparison usrp-testbed-photos">
      <figure>
        <img src="{{ '/assets/demos/multihop-usrp/lab-bench.jpg' | relative_url }}" alt="Multi-USRP and RF measurement equipment arranged on a laboratory bench" loading="lazy">
        <figcaption>Laboratory setup combining SDR, networking, and RF measurement equipment.</figcaption>
      </figure>
      <figure>
        <img src="{{ '/assets/demos/multihop-usrp/full-testbed.jpg' | relative_url }}" alt="Three host computers connected through a rack-mounted network switch to three USRP radios" loading="lazy">
        <figcaption>Three-host and three-USRP setup connected through the rack-mounted network infrastructure.</figcaption>
      </figure>
    </div>
  </section>

  <section class="demo-detail-section">
    <h2>2. Multi-USRP Network</h2>
    <p>
      The reference setup connects two USRP N320 radios, one host, and a Cisco C9300 switch. Copper Ethernet carries the 1.5-Gb/s management and control path with MTU 1500, while fiber SFP+ links provide a dedicated 10-Gb/s radio-data path with MTU 9000.
    </p>
    <div class="usrp-network-diagram" role="img" aria-label="A host connects to a Cisco C9300 switch and two USRP N320 radios through separate Ethernet management and SFP data paths">
      <div class="usrp-network-node usrp-network-host">
        <strong>Host</strong>
        <span>UHD · Capture</span>
      </div>
      <div class="usrp-network-paths" aria-hidden="true">
        <span class="usrp-network-control">Ethernet</span>
        <span class="usrp-network-data">SFP+</span>
      </div>
      <div class="usrp-network-node usrp-network-switch">
        <strong>Cisco C9300</strong>
        <span>Layer-3 Switch</span>
      </div>
      <div class="usrp-network-paths" aria-hidden="true">
        <span class="usrp-network-control">Control</span>
        <span class="usrp-network-data">Radio data</span>
      </div>
      <div class="usrp-network-radios">
        <div class="usrp-network-node"><strong>USRP N320-1</strong><span>MGMT · SFP+</span></div>
        <div class="usrp-network-node"><strong>USRP N320-2</strong><span>MGMT · SFP+</span></div>
      </div>
    </div>
    <h3>Cisco Switch Configuration</h3>
    <p>
      I configured the Cisco Layer-3 switch access ports and management VLAN as a dedicated control plane for the host and USRPs. The switch virtual interface provides the management-plane anchor, while the SDR sample path remains isolated from device control and UHD RPC traffic.
    </p>
    <h3>Host-to-USRP Data-Path Bring-up</h3>
    <p>
      For directly attached radios, each host SFP interface uses a point-to-point /32 address with an explicit on-link route to its paired USRP. This makes the intended egress interface unambiguous without relying on a conventional shared-subnet gateway. Jumbo frames are enabled end to end with MTU 9000 on the host and selected USRP SFP interface; the USRP data interface obtains its IPv4 configuration through DHCP and uses transmit flow control.
    </p>
    <h3>USRP Provisioning and Path Validation</h3>
    <p>
      I kept the host UHD version aligned with the N3xx filesystem image, supported both network-based image refresh and local SD-card recovery, and loaded the XG FPGA image required for the high-rate interface. I then verified the separation of planes by observing a sustained UDP/CHDR stream on the SFP data path during transmission, while the management interface carried only low-rate control traffic.
    </p>
    <h3>PTP Timing Discipline</h3>
    <p>
      The Cisco switch runs IEEE 1588v2 in boundary-clock, delay-request mode. A hardware-timestamped host can become the preferred grandmaster through the best-master clock algorithm, while the remaining hosts operate as slave-only ordinary clocks. Their NIC hardware clocks are then disciplined to the system clock, providing a common time base for timestamp and correlation-based latency measurement.
    </p>
  </section>

  <section class="demo-detail-section">
    <h2>3. SDR Waveform Transmission for Host-to-USRP Latency</h2>
    <p>
      A PRACH-like Zadoff–Chu waveform with sequence length N<sub>ZC</sub> = 839 and cyclic shift N<sub>CS</sub> = 13 is transmitted from the host as a timing probe for the host-to-USRP path. This configuration supports 64 long preambles. The host records the transmission timestamp, and the receiving USRP identifies the waveform's correlation peak; their difference provides the end-to-end latency estimate.
    </p>
    <figure>
      <img src="{{ '/assets/demos/multihop-usrp/tx-waveform.png' | relative_url }}" alt="Real component, imaginary component, amplitude, and phase of the transmitted Zadoff-Chu waveform" loading="lazy">
      <figcaption>Host-generated Zadoff–Chu timing probe shown as real, imaginary, amplitude, and phase components.</figcaption>
    </figure>
    <div class="usrp-processing-flow" aria-label="Host-to-USRP latency measurement processing flow">
      <span>Host Tx timestamp</span><b aria-hidden="true">→</b><span>USRP received samples</span><b aria-hidden="true">→</b><span>FFT</span><b aria-hidden="true">→</b><span>IFFT correlation</span><b aria-hidden="true">→</b><span>Latency from peak</span>
    </div>
    <div class="demo-detail-comparison">
      <figure>
        <img src="{{ '/assets/demos/multihop-usrp/rx-amplitude.png' | relative_url }}" alt="Overview and detail plots of the received waveform amplitude" loading="lazy">
        <figcaption>Received amplitude overview and sample-level detail.</figcaption>
      </figure>
      <figure>
        <img src="{{ '/assets/demos/multihop-usrp/rx-correlation.png' | relative_url }}" alt="Correlation magnitude with a detected peak lag" loading="lazy">
        <figcaption>The correlation peak marks the host-generated probe's arrival at the USRP.</figcaption>
      </figure>
    </div>
  </section>

  <section class="demo-detail-section">
    <h2>4. Packet-Level Observation</h2>
    <p>
      Network traffic and USRP reception are observed together while the timing probe is transmitted. This joint view aligns CHDR packet activity on the Ethernet path with the USRP receiver timeline before the host-to-USRP delay is calculated.
    </p>
    <div class="usrp-capture-timeline" role="img" aria-label="Packet capture begins before USRP receive monitoring and ends after monitoring completes">
      <div class="usrp-capture-track">
        <strong>Network interface</strong>
        <span class="usrp-capture-bar usrp-capture-network">Packet capture</span>
      </div>
      <div class="usrp-capture-track">
        <strong>USRP receiver</strong>
        <span class="usrp-capture-bar usrp-capture-radio">RX monitoring</span>
      </div>
      <div class="usrp-capture-axis"><span>Capture start</span><span>RX start</span><span>RX end</span><span>Capture end</span></div>
    </div>
    <p>
      The two streams operate at very different rates: packet observations arrive at roughly 3,000 samples per second, while the USRP receiver produces 1 million RF samples per second. Linear sample matching establishes the shared time scale, and Tx–Rx offset matching aligns the corresponding events.
    </p>
    <div class="usrp-rate-comparison" role="img" aria-label="A sparse packet timeline at about 3000 samples per second is aligned to a dense RF sample timeline at 1 million samples per second">
      <div class="usrp-rate-row">
        <strong>Packet timeline</strong>
        <span class="usrp-rate-track usrp-rate-packets"></span>
        <b>≈ 3,000 samples/s</b>
      </div>
      <div class="usrp-rate-match"><span>Linear sample matching</span><span>Tx–Rx offset matching</span></div>
      <div class="usrp-rate-row">
        <strong>RF timeline</strong>
        <span class="usrp-rate-track usrp-rate-samples"></span>
        <b>1,000,000 samples/s</b>
      </div>
    </div>
  </section>

  <section class="demo-detail-section">
    <h2>5. Host-to-USRP Latency Measurement</h2>
    <p>
      The correlation peak at the USRP is aligned with the host's transmitter VITA timestamp to estimate the host-to-USRP delay across the networked SDR path. The reference measurement reports an approximately 0.27-second interval between host transmission and the detected receive event.
    </p>
    <figure>
      <img src="{{ '/assets/demos/multihop-usrp/latency-correlation.png' | relative_url }}" alt="Correlation plot marking the transmitted timestamp and detected receive peak" loading="lazy">
      <figcaption>Tx timestamp and correlation peak shown on a common capture timeline.</figcaption>
    </figure>
  </section>

  <section class="demo-detail-section demo-detail-notes">
    <h2>What This Demo Shows</h2>
    <ul>
      <li>A Layer-3 switch can coordinate management, high-rate SDR data, and timing across multiple USRPs.</li>
      <li>RF samples and packet traces can be inspected together across the end-to-end testbed.</li>
      <li>A known reference waveform enables correlation-based latency measurement in a networked radio experiment.</li>
    </ul>
  </section>
</div>
