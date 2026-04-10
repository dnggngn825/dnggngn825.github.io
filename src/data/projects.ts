import thumbnailAmr      from '../assets/images/thumbnail-amr.jpg'
import thumbnailChessbot from '../assets/images/thumbnail-chessbot.jpg'
import thumbnailProsarm  from '../assets/images/thumbnail-prosarm.jpg'
import thumbnailDental   from '../assets/images/thumbnail-dental.jpg'
import thumbnailPersonal   from '../assets/images/thumbnail-personal-web.jpg'

import amrWarehouse   from '../assets/images/amr/warehouselayout.jpg'
import amrSetup       from '../assets/images/amr/setup-pp.jpg'
import amrExample     from '../assets/images/amr/example-pp.jpg'
import amrTraj        from '../assets/images/amr/trajtrack.jpg'
import amrDiagram     from '../assets/images/amr/systems-level-diagram.jpeg'

import chessbotCad       from '../assets/images/chessbot/cad-model.jpg'
import chessbotSchematic from '../assets/images/chessbot/schematic.jpg'
import chessbotWorkspace from '../assets/images/chessbot/workspace-side-view-top-view.jpg'
import chessbotReachable from '../assets/images/chessbot/workspace-reachable.jpg'
import chessbotIk        from '../assets/images/chessbot/ik-result.jpg'
import chessbotCorner    from '../assets/images/chessbot/corner-visual.jpg'
import chessbotSide      from '../assets/images/chessbot/sideview-traj.jpg'
import chessbotResult    from '../assets/images/chessbot/result-traj.jpg'

export interface ProjectContributor {
  name:   string
  email?: string
}

export interface ProjectImage {
  src:      string
  alt:      string
  caption?: string
}

export interface Project {
  id:           string
  title:        string
  year:         string
  tech:         string[]
  summary:      string
  thumbnail?:   string
  github?:      string
  liveUrl?:     string
  videoEmbed?:  string
  contributors: ProjectContributor[]
  goal?:           string
  whatWasDone?:    string[]
  challenges?:     string[]
  improvements?:   string[]
  images?:         ProjectImage[]
  hasMath?:        boolean
  richSections?:   { heading: string; body: string; isMath?: boolean }[]
}

export const projects: Project[] = [
  {
    id:      'personal-website',
    title:   'Personal Portfolio Website',
    year:    '2021, 2026',
    thumbnail: thumbnailPersonal,
    tech:    ['React', 'TypeScript', 'Tailwind CSS', 'GitHub Actions', "Motion", 'Vite'],
    summary: 'A personal portfolio website built with React and TypeScript, featuring a custom design system, smooth animations, and a responsive layout to showcase projects and experience.',
    github:    'https://github.com/dnggngn825/dnggngn825.github.io',
    contributors: [
      { name: 'Danny Nguyen', email: 'h.danggnguyen@gmail.com' },
    ],
    goal: 'Design and develop a personal portfolio website from scratch to showcase my projects, experience, and skills, using modern web technologies and best practices.',
    whatWasDone: [
      'Designed a clean, modern UI with a custom color palette and typography.',
      'Implemented responsive layouts for optimal viewing on desktop and mobile devices.',
      'Added smooth animations and transitions using Framer Motion for enhanced user experience.',
      'Organised content into sections (About, Experience, Projects, Contact) with clear navigation.',
      'Deployed the site using Vite for fast build times and optimized performance.',
    ],
    improvements: [
      'Add a blog section to share technical articles and insights.',
      'Implement dark mode support for better accessibility and user preference.',
      'Integrate analytics to track visitor interactions and improve content strategy.',
      'Google lighthouse optimisations for even better performance scores.',
      'Add internationalisation (i18n) support to reach a wider audience.',
      'React server components for improved performance and SEO.',
    ],
  },
  {
    id:      'autonomous-warehouse-robot',
    title:   'Autonomous Warehouse Robot',
    year:    '2021',
    tech:    ['C++', 'Python', 'ROS', 'MATLAB', 'Simulink', 'Fusion 360'],
    summary: 'A mobile robot that autonomously navigates a small-scale warehouse, performing sequential pick-and-drop tasks between a dispenser and receptacle using A* path planning and PID motion control.',
    thumbnail: thumbnailAmr,
    github:    'https://github.com/dnggngn825/TheAutonomousRobot',
    videoEmbed: 'https://www.youtube.com/embed/sfTwIrL2xUA',
    contributors: [
      { name: 'Danny Nguyen', email: 'hain4@student.unimelb.edu.au' },
      { name: 'Hoang Viet Pham' },
      { name: 'Quang Trung Le' },
    ],
    goal: 'Design and implement the full software stack for a mobile robot platform to autonomously perform pick-and-drop tasks in a simplified warehouse environment, covering path planning, trajectory tracking, motion control, and ROS integration.',
    whatWasDone: [
      'Implemented A* algorithm for global path planning between dispenser and receptacle nodes on a predefined warehouse map.',
      'Designed a trajectory tracking controller using straight-line path segments with PID-based heading and velocity control.',
      'Built a ROS node architecture on an NVIDIA Jetson Xavier integrating LiDAR, wheel encoders, and servo actuators.',
      'Simulated and validated the system in MATLAB/Simulink prior to hardware deployment.',
      'Modelled robot chassis and gripper mechanism in Fusion 360 for physical prototyping.',
      'Produced technical documentation in LaTeX covering system design, algorithm derivation, and experimental results.',
    ],
    challenges: [
      'Tuning PID gains for trajectory tracking was time-consuming; small parameter changes significantly affected overshoot and settling time.',
      'ROS communication latency between nodes occasionally caused sensor-actuator desynchronisation at higher speeds.',
      'Sensor noise from the LiDAR in the confined warehouse environment required additional filtering effort.',
    ],
    improvements: [
      'Implement dynamic obstacle avoidance using real-time LiDAR data rather than a static pre-planned path.',
      'Explore model predictive control (MPC) as an alternative to PID for smoother trajectory tracking.',
      'Add a localisation module (e.g., particle filter SLAM) to handle map uncertainties and drift over long runs.',
      'Profile ROS node communication and migrate latency-critical paths to zero-copy transport.',
    ],
    images: [
      { src: amrWarehouse, alt: 'Warehouse layout diagram', caption: 'Warehouse grid layout with path nodes' },
      { src: amrSetup,     alt: 'Path planning setup',      caption: 'Path planning initialisation' },
      { src: amrExample,   alt: 'Example path',             caption: 'A* computed path example' },
      { src: amrTraj,      alt: 'Trajectory tracking',      caption: 'Trajectory tracking result' },
      { src: amrDiagram,   alt: 'Systems-level diagram',    caption: 'ROS node architecture overview' },
    ],
  },

  {
    id:      'chessbot',
    title:   'The Chessbot – 4 DoF Robot Arm',
    year:    '2021',
    tech:    ['MATLAB', 'Fusion 360', 'Arduino', 'LaTeX'],
    summary: 'A 4-DoF serial robot arm designed to pick and place chess pieces on a chessboard, implementing Forward/Inverse Kinematics via Denavit-Hartenberg tables, task-space velocity control, and cubic polynomial trajectory generation.',
    thumbnail: thumbnailChessbot,
    github:    'https://github.com/dnggngn825/The-Chess-Bot',
    videoEmbed: 'https://www.youtube.com/embed/hXdCUFKoFOs',
    hasMath: true,
    contributors: [
      { name: 'Danny Nguyen', email: 'hain4@student.unimelb.edu.au' },
      { name: 'Say Ee See',      email: 'says@student.unimelb.edu.au' },
      { name: 'BhargavRam Chilukuri' },
    ],
    goal: 'Design a 4-DoF serial robot arm capable of picking and placing chess pieces, developing the full kinematic model (FK/IK), trajectory generation, and embedded control from first principles.',
    whatWasDone: [
      'Derived the forward kinematics model using the Denavit-Hartenberg convention and validated it against the physical arm.',
      'Solved inverse kinematics analytically for all reachable configurations in the robot workspace.',
      'Implemented task-space velocity control to produce smooth end-effector motion along planned paths.',
      'Generated joint trajectories using cubic polynomial interpolation to enforce velocity boundary conditions.',
      'Modelled the robot arm in Fusion 360 and fabricated physical links using 3D-printed components.',
      'Programmed an Arduino Mega to drive FeeTech servo motors based on MATLAB-computed joint commands.',
      'Defined the reachable workspace geometrically and verified corner-to-corner chessboard coverage.',
    ],
    challenges: [
      'Inverse kinematics had multiple solution branches; selecting the correct branch programmatically required careful geometric reasoning.',
      'Servo motor backlash and flex in 3D-printed links introduced positional errors at end-effector that accumulated across joints.',
      'Calibrating the mapping between MATLAB workspace coordinates and physical chessboard positions was tedious and error-prone.',
    ],
    improvements: [
      'Integrate a vision system (camera + OpenCV) for autonomous piece detection and pose estimation rather than hardcoded positions.',
      'Replace 3D-printed links with machined aluminium or carbon fibre to reduce flex and improve repeatability.',
      'Implement a closed-loop position controller using encoder feedback to compensate for servo backlash.',
      'Extend the trajectory planner to handle obstacle avoidance when pieces are in the path.',
    ],
    images: [
      { src: chessbotCad,       alt: 'CAD model',                     caption: 'Fusion 360 CAD model' },
      { src: chessbotSchematic, alt: 'Circuit schematic',              caption: 'Arduino wiring schematic' },
      { src: chessbotWorkspace, alt: 'Workspace side and top view',    caption: 'Robot workspace visualisation' },
      { src: chessbotReachable, alt: 'Reachable workspace',            caption: 'Reachable workspace boundary' },
      { src: chessbotIk,        alt: 'IK result',                      caption: 'Inverse kinematics result' },
      { src: chessbotCorner,    alt: 'Corner visual verification',     caption: 'End-effector corner alignment' },
      { src: chessbotSide,      alt: 'Side-view trajectory',           caption: 'Side-view trajectory tracking' },
      { src: chessbotResult,    alt: 'Trajectory result',              caption: 'Final trajectory execution result' },
    ],
    richSections: [
      {
        heading: 'Kinematic Model',
        body: 'Forward kinematics were derived using the Denavit-Hartenberg (D-H) convention. Each joint transformation is expressed as a homogeneous matrix \\(T_i = R_z(\\theta_i) \\cdot T_z(d_i) \\cdot T_x(a_i) \\cdot R_x(\\alpha_i)\\). The end-effector pose is obtained by chaining all joint transforms: \\(T_{0}^{4} = T_{0}^{1} T_{1}^{2} T_{2}^{3} T_{3}^{4}\\).',
        isMath: true,
      },
      {
        heading: 'Trajectory Generation',
        body: 'Joint trajectories were planned using cubic polynomials of the form \\(q(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3\\), ensuring zero velocity at start and end of each motion segment. Coefficients were solved from boundary conditions on position and velocity.',
        isMath: true,
      },
    ],
  },

  {
    id:      'autonomous-steering',
    title:   'Autonomous Steering System',
    year:    '2020–2021',
    tech:    ['ANSYS', 'Fusion 360', 'CANopen', 'MATLAB', 'Simulink', 'ROS'],
    summary: 'Capstone project: design and implementation of an autonomous steering system for a Formula SAE vehicle, integrating CANopen motor control, structural FEA analysis, and simulation-based algorithm validation.',
    contributors: [
      { name: 'Danny Nguyen' },
    ],
    goal: 'Develop an end-to-end autonomous steering system for the Melbourne University Racing Formula SAE car, from mechanical design and FEA validation through to embedded control and ROS integration.',
    whatWasDone: [
      'Designed the steering actuator mounting geometry in Fusion 360, constrained by the existing vehicle chassis.',
      'Performed finite element analysis (FEA) in ANSYS to validate structural integrity under peak steering loads.',
      'Implemented CANopen protocol for real-time communication between the steering motor controller and the vehicle ECU.',
      'Developed and validated a steering angle control algorithm in MATLAB/Simulink using hardware-in-the-loop simulation.',
      'Integrated the steering controller into the broader vehicle autonomy stack via ROS.',
    ],
    challenges: [
      'CANopen timing constraints were tight; ensuring deterministic message delivery required careful bus configuration.',
      'Aligning the mechanical design with the existing chassis left limited packaging space for the actuator and sensors.',
      'COVID-19 restrictions limited physical testing time, making simulation validation particularly critical.',
    ],
    improvements: [
      'Implement a full path-tracking controller (e.g., Stanley or pure pursuit) that uses the steering system as an actuator input.',
      'Add redundancy in the CANopen network to handle single-node failures gracefully.',
      'Conduct more extensive hardware-in-the-loop testing with higher-fidelity vehicle dynamics models.',
    ],
  },

  {
    id:      'prosthetic-arm',
    title:   'The Prosthetic Arm',
    year:    '2018',
    tech:    ['Arduino', 'Fusion 360'],
    summary: 'An affordable, lightweight prosthetic arm prototype built for Colombian charity eNABLE. EMG sensor signals are processed by an Arduino to control DC servo motors, enabling various hand gestures.',
    thumbnail: thumbnailProsarm,
    contributors: [
      { name: 'Danny Nguyen' },
    ],
    goal: 'Design and build a functional, low-cost upper-limb prosthetic for the eNABLE charity, using surface EMG sensing and Arduino-controlled servos to enable gesture control.',
    whatWasDone: [
      'Modelled the prosthetic hand and forearm assembly in Fusion 360, optimised for 3D printing.',
      'Processed EMG sensor signals with an Arduino to detect muscle contraction patterns.',
      'Mapped detected EMG signals to servo motor commands for multiple grip configurations.',
      'Assembled and tested the prototype, demonstrating open/close and lateral pinch gestures.',
    ],
    challenges: [
      'EMG signal quality was highly sensitive to electrode placement and skin resistance, requiring robust filtering.',
      'Achieving sufficient grip force with small hobby servos was challenging given the weight constraints.',
      'Calibrating the EMG thresholds for different users took significant time.',
    ],
    improvements: [
      'Replace surface EMG with higher-quality dry electrodes to improve signal reliability.',
      'Implement a machine learning classifier to distinguish more complex gesture patterns.',
      'Explore continuous servo control based on EMG amplitude rather than threshold-based on/off switching.',
    ],
  },

  {
    id:      'dental-mirror',
    title:   'The Dental Mirror – 3D Printing Hackathon',
    year:    '2017',
    tech:    ['Fusion 360'],
    summary: 'An affordable 3D-printed dental mirror redesign created during a hackathon. Achieved runner-up by addressing ergonomics, sterilisability, and cost barriers in existing dental instruments.',
    thumbnail: thumbnailDental,
    contributors: [
      { name: 'Danny Nguyen' },
    ],
    goal: 'Redesign a conventional dental mirror to be manufacturable via FDM 3D printing, reducing cost while improving ergonomics and enabling single-use sterilisation for resource-constrained clinics.',
    whatWasDone: [
      'Identified key pain points in existing dental mirror designs through user research with dental students.',
      'Modelled an ergonomic handle and detachable mirror head assembly in Fusion 360.',
      'Prepared a pitch deck and presented the solution to a panel of clinical and engineering experts.',
      'Achieved runner-up position in the University of Melbourne 3D Printing Hackathon.',
    ],
    challenges: [
      'FDM-printed surfaces require post-processing to meet clinical hygiene standards — surface finish was a key constraint.',
      'Achieving adequate rigidity in the thin mirror head without excess material was a geometric challenge.',
      'Time pressure of the hackathon format limited iteration cycles.',
    ],
    improvements: [
      'Explore resin (SLA) printing for finer surface finish and better sterilisability.',
      'Conduct formal ergonomic testing with practicing dental professionals.',
      'Investigate coating options (e.g., antimicrobial spray) compatible with 3D-printed materials.',
    ],
  },
]
