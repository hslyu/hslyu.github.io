---
layout: page
permalink: /demos/pinching-warehouse-twin/
title: Pinching Antenna Digital Twin Demo
nav: false
---

<div class="demo-detail-page">
  <a class="demo-detail-back" href="{{ '/demos/' | relative_url }}" aria-label="Back to Demos">
    <span aria-hidden="true">←</span> Back to Demos
  </a>

  <p class="demo-detail-lead">
    This demo builds a warehouse digital twin step by step, then uses the completed scene to simulate pinching-antenna propagation and measure the resulting wireless channel.
  </p>

  <section class="demo-detail-section">
    <h2>1. Camera Layout</h2>
    <p>
      A shared ceiling-camera grid establishes a common spatial reference in Isaac Sim and Sionna RT. Matching camera positions and orientations make it possible to compare the two representations from consistent viewpoints.
    </p>
    <div class="demo-detail-comparison">
      <figure>
        <img src="{{ '/assets/demos/pinching-warehouse-twin/isaac-camera-layout.jpg' | relative_url }}" alt="Shared ceiling-camera layout in the Isaac Sim warehouse" loading="lazy">
        <figcaption>Camera locations overlaid on the Isaac Sim warehouse.</figcaption>
      </figure>
      <figure>
        <img src="{{ '/assets/demos/pinching-warehouse-twin/sionna-camera-layout.jpg' | relative_url }}" alt="Shared ceiling-camera layout in the Sionna RT warehouse" loading="lazy">
        <figcaption>The same camera grid transferred to Sionna RT.</figcaption>
      </figure>
    </div>
  </section>

  <section class="demo-detail-section">
    <h2>2. Object Placement</h2>
    <p>
      Warehouse geometry and scene objects are aligned across the two simulators. Shelves, boxes, pallets, and aisles retain corresponding positions after the scene is converted from its visual-simulation representation to its radio-simulation representation.
    </p>
    <div class="demo-detail-comparison">
      <figure>
        <img src="{{ '/assets/demos/pinching-warehouse-twin/isaac-object-layout.jpg' | relative_url }}" alt="Warehouse object placement in Isaac Sim" loading="lazy">
        <figcaption>Object placement in the Isaac Sim bird's-eye view.</figcaption>
      </figure>
      <figure>
        <img src="{{ '/assets/demos/pinching-warehouse-twin/sionna-object-layout.jpg' | relative_url }}" alt="Warehouse object placement in Sionna RT" loading="lazy">
        <figcaption>Corresponding object placement in the Sionna RT scene.</figcaption>
      </figure>
    </div>
  </section>

  <section class="demo-detail-section">
    <h2>3. Robot Placement</h2>
    <p>
      An iw.hub mobile robot is inserted at a shared pose. Isaac Sim provides semantic ground truth and verifies the robot location with a detection box, while Sionna RT uses the corresponding pose in the radio scene.
    </p>
    <div class="demo-detail-comparison">
      <figure>
        <img src="{{ '/assets/demos/pinching-warehouse-twin/isaac-detection.jpg' | relative_url }}" alt="Detected iw.hub robot at its Isaac Sim pose" loading="lazy">
        <figcaption>Robot placement verified with Isaac Sim synthetic ground-truth detection.</figcaption>
      </figure>
      <figure>
        <img class="demo-detail-rotate-180" src="{{ '/assets/demos/pinching-warehouse-twin/sionna-scene.jpg' | relative_url }}" alt="The iw.hub robot transferred to the matching Sionna RT pose" loading="lazy">
        <figcaption>The same robot pose represented in the Sionna RT scene.</figcaption>
      </figure>
    </div>
  </section>

  <section class="demo-detail-section">
    <h2>4. Ray-Tracing Simulation</h2>
    <p>
      Pinch points distributed along the waveguides are modeled as transmitters at 28 GHz. Sionna RT traces representative line-of-sight and reflected paths from an active pinch point to the receiver through the completed warehouse scene.
    </p>
    <figure>
      <img src="{{ '/assets/demos/pinching-warehouse-twin/ray-tracing.jpg' | relative_url }}" alt="Representative Sionna RT paths between a pinching antenna and the warehouse receiver" loading="lazy">
      <figcaption>Representative propagation paths from the selected pinch point to the receiver.</figcaption>
    </figure>
  </section>

  <section class="demo-detail-section">
    <h2>5. Channel Measurement</h2>
    <p>
      The traced paths are coherently combined to estimate the OFDM channel at the receiver. The upper plot shows frequency-selective received power, while the lower plot shows unwrapped channel phase across the baseband subcarriers.
    </p>
    <figure>
      <img src="{{ '/assets/demos/pinching-warehouse-twin/channel-response.jpg' | relative_url }}" alt="Received power and unwrapped phase of the simulated pinching-antenna OFDM channel" loading="lazy">
      <figcaption>Estimated OFDM channel response obtained from the ray-tracing paths.</figcaption>
    </figure>
  </section>

  <section class="demo-detail-section demo-detail-notes">
    <h2>What This Demo Shows</h2>
    <ul>
      <li>A consistent warehouse scene can support both visual robotics simulation and wireless ray tracing.</li>
      <li>Camera, object, and robot poses remain aligned across Isaac Sim and Sionna RT.</li>
      <li>Pinching-antenna propagation paths can be converted into an interpretable frequency-selective channel response.</li>
    </ul>
  </section>
</div>
