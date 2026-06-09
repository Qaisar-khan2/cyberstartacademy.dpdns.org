/**
 * CyberStart Academy — script.js
 * Main application logic: navigation, data, UI rendering
 */

'use strict';

/* ============================================================
   DATA STORE
   ============================================================ */

const DATA = {
  courses: [
    { id:'c01', title:'Introduction to Cybersecurity', desc:'Explore the threat landscape, career paths, and foundational security concepts that every practitioner needs.', level:'beginner', icon:'🔐', duration:'6h', xp:200, modules:8, category:'foundations' },
    { id:'c02', title:'Basic Networking for Security', desc:'TCP/IP, OSI model, DNS, HTTP/S, subnetting, and how protocols are exploited — essential groundwork.', level:'beginner', icon:'🌐', duration:'8h', xp:250, modules:10, category:'networking' },
    { id:'c03', title:'Linux Fundamentals', desc:'Master the Linux command line: filesystem, users, permissions, processes, and shell scripting basics.', level:'beginner', icon:'🐧', duration:'10h', xp:300, modules:12, category:'linux' },
    { id:'c04', title:'Kali Linux Introduction', desc:'Navigate and configure Kali Linux, understand its toolset, and set up a proper lab environment.', level:'beginner', icon:'🐉', duration:'5h', xp:200, modules:6, category:'linux' },
    { id:'c05', title:'Terminal Mastery', desc:'CLI power techniques, bash scripting, automation, piping, and productivity workflows for security work.', level:'beginner', icon:'⌨️', duration:'7h', xp:220, modules:9, category:'linux' },
    { id:'c06', title:'Cybersecurity Ethics & Law', desc:'Legal frameworks (CFAA, CMA), responsible disclosure, CVE process, and professional ethics standards.', level:'beginner', icon:'⚖️', duration:'4h', xp:150, modules:5, category:'foundations' },
    { id:'c07', title:'Web Security Fundamentals', desc:'OWASP Top 10 deep dive: XSS, SQL injection, CSRF, IDOR, and secure development practices.', level:'intermediate', icon:'🕸️', duration:'12h', xp:400, modules:14, category:'web' },
    { id:'c08', title:'Password Security & Cryptography', desc:'Hashing algorithms, salting, bcrypt, credential storage best practices, and common authentication flaws.', level:'intermediate', icon:'🔑', duration:'8h', xp:350, modules:10, category:'cryptography' },
    { id:'c09', title:'Vulnerability Assessment', desc:'CVE/CVSS scoring, scanning methodology, vulnerability lifecycle, and documentation best practices.', level:'intermediate', icon:'🔍', duration:'10h', xp:380, modules:11, category:'assessment' },
    { id:'c10', title:'Wi-Fi Security Concepts', desc:'WPA2/3 architecture, 802.1X, SSID vulnerabilities, rogue AP detection, and enterprise Wi-Fi security.', level:'intermediate', icon:'📡', duration:'7h', xp:320, modules:8, category:'networking' },
    { id:'c11', title:'OSINT & Information Gathering', desc:'Passive reconnaissance, Shodan, Google dorking, Maltego basics, and digital footprint analysis.', level:'intermediate', icon:'🔎', duration:'9h', xp:360, modules:11, category:'recon' },
    { id:'c12', title:'Security Tools Overview', desc:'Hands-on introduction to Nmap, Wireshark, Burp Suite Community, and Metasploit in authorized lab environments.', level:'intermediate', icon:'🛠️', duration:'15h', xp:450, modules:16, category:'tools' },
    { id:'c13', title:'Penetration Testing Methodology', desc:'PTES framework, scoping, rules of engagement, reporting, and professional pentest workflows.', level:'advanced', icon:'🎯', duration:'18h', xp:600, modules:20, category:'pentest' },
    { id:'c14', title:'Security Auditing & Compliance', desc:'ISO 27001, NIST CSF, PCI-DSS, SOC 2 — conducting security audits and compliance assessments.', level:'advanced', icon:'📋', duration:'12h', xp:500, modules:14, category:'compliance' },
    { id:'c15', title:'Digital Forensics Basics', desc:'Evidence handling, disk imaging, memory forensics, log analysis, and chain of custody procedures.', level:'advanced', icon:'🔬', duration:'14h', xp:550, modules:16, category:'forensics' },
    { id:'c16', title:'Threat Analysis & Intelligence', desc:'MITRE ATT&CK framework, threat modeling, IOC development, and threat actor profiling techniques.', level:'advanced', icon:'⚠️', duration:'11h', xp:520, modules:13, category:'threat-intel' },
    { id:'c17', title:'Defensive Security & Hardening', desc:'Firewall rules, IDS/IPS configuration, SIEM integration, system hardening, and security baselines.', level:'advanced', icon:'🛡️', duration:'16h', xp:580, modules:18, category:'defense' },
    { id:'c18', title:'Incident Response', desc:'IR lifecycle, detection, containment, eradication, recovery, and post-incident lessons learned.', level:'advanced', icon:'🚨', duration:'13h', xp:540, modules:15, category:'ir' },
  ],

  labs: [
    { id:'l01', name:'Network Scanning Fundamentals', desc:'Use Nmap to discover hosts, identify open ports, and enumerate services in an isolated virtual network.', icon:'🌐', difficulty:'easy', type:'network', xp:100, duration:'45 min', progress:0 },
    { id:'l02', name:'Web App Recon Lab', desc:'Perform authorized reconnaissance on a deliberately vulnerable web application using passive and active methods.', icon:'🕵️', difficulty:'easy', type:'web', xp:120, duration:'60 min', progress:0 },
    { id:'l03', name:'CTF: Beginner Box', desc:'A beginner-friendly Capture The Flag machine. Find the hidden flags by exploiting a misconfigured web service.', icon:'🚩', difficulty:'easy', type:'ctf', xp:200, duration:'90 min', progress:0 },
    { id:'l04', name:'Packet Analysis with Wireshark', desc:'Capture and analyze network traffic to identify protocols, extract data, and spot anomalies in PCAP files.', icon:'📊', difficulty:'medium', type:'network', xp:180, duration:'60 min', progress:0 },
    { id:'l05', name:'SQL Injection Playground', desc:'Practice identifying and exploiting SQL injection vulnerabilities in a purpose-built vulnerable application.', icon:'💉', difficulty:'medium', type:'web', xp:220, duration:'75 min', progress:0 },
    { id:'l06', name:'XSS Challenge Lab', desc:'Discover and exploit multiple types of Cross-Site Scripting vulnerabilities across 5 progressively harder challenges.', icon:'🔸', difficulty:'medium', type:'web', xp:200, duration:'60 min', progress:0 },
    { id:'l07', name:'CTF: Intermediate Machine', desc:'Enumerate, gain a foothold, escalate privileges, and retrieve both flags from this intermediate-level Linux machine.', icon:'🚩', difficulty:'medium', type:'ctf', xp:350, duration:'3 hours', progress:0 },
    { id:'l08', name:'Password Cracking Lab', desc:'Use dictionary attacks, rainbow tables, and rule-based cracking on provided password hashes in an isolated environment.', icon:'🔓', difficulty:'medium', type:'sandbox', xp:250, duration:'90 min', progress:0 },
    { id:'l09', name:'Linux Privilege Escalation', desc:'Start as a low-privilege user and discover one or more methods to escalate to root on a configured Linux machine.', icon:'⬆️', difficulty:'hard', type:'ctf', xp:400, duration:'4 hours', progress:0 },
    { id:'l10', name:'Web App Penetration Test', desc:'Full pentest simulation: reconnaissance, vulnerability identification, exploitation, and professional report writing.', icon:'🎯', difficulty:'hard', type:'web', xp:500, duration:'6 hours', progress:0 },
    { id:'l11', name:'Memory Forensics Analysis', desc:'Analyse a memory dump from a compromised system to identify malware, extract artifacts, and reconstruct the attack.', icon:'🔬', difficulty:'hard', type:'forensics', xp:450, duration:'4 hours', progress:0 },
    { id:'l12', name:'Sandbox Playground', desc:'A fully open sandbox environment. Install tools, run experiments, and practice techniques without any objectives.', icon:'🏖️', difficulty:'easy', type:'sandbox', xp:50, duration:'Unlimited', progress:0 },
  ],

  quizzes: [
    {
      id:'q01', title:'Cybersecurity Foundations', icon:'🔐', level:'Beginner', questions:10, passMark:70,
      questions_data: [
        { q:'What does CIA stand for in cybersecurity?', options:['Confidentiality, Integrity, Availability','Central Intelligence Agency','Cyber Incident Assessment','Connectivity, Infrastructure, Access'], correct:0, explanation:'The CIA triad (Confidentiality, Integrity, Availability) is the foundational model for information security policy.' },
        { q:'Which of the following is an example of a social engineering attack?', options:['SQL Injection','Phishing Email','Buffer Overflow','Man-in-the-Middle'], correct:1, explanation:'Phishing is a social engineering attack that manipulates people into revealing sensitive information.' },
        { q:'What port does HTTPS typically use?', options:['80','8080','443','22'], correct:2, explanation:'HTTPS uses port 443 by default. HTTP uses port 80.' },
        { q:'What is a zero-day vulnerability?', options:['A vulnerability known for exactly 24 hours','A flaw unknown to the software vendor with no available patch','A vulnerability that only affects old software','An attack that occurs at midnight'], correct:1, explanation:'A zero-day vulnerability is an unknown security flaw that has no available patch, making it especially dangerous.' },
        { q:'What does "defense in depth" mean?', options:['Using the deepest firewall rules','Layering multiple security controls so failure of one doesn\'t compromise everything','Only protecting the most important assets','Focusing all defense on the network perimeter'], correct:1, explanation:'Defense in depth uses multiple security layers — if one fails, others remain in place.' },
        { q:'What is the primary purpose of a firewall?', options:['Speed up network traffic','Encrypt all data','Filter and control network traffic based on rules','Store security logs'], correct:2, explanation:'Firewalls control incoming and outgoing network traffic based on predetermined security rules.' },
        { q:'Which type of malware encrypts your files and demands payment?', options:['Spyware','Adware','Ransomware','Keylogger'], correct:2, explanation:'Ransomware encrypts victim files and demands payment (usually cryptocurrency) for the decryption key.' },
        { q:'What is a CVE?', options:['Common Vulnerability and Exposure','Cyber Vulnerability Entry','Central Virus Enumeration','Common Version Error'], correct:0, explanation:'CVE (Common Vulnerabilities and Exposures) is a standardized list of publicly disclosed security vulnerabilities.' },
        { q:'What does MFA stand for and why is it important?', options:['Multi-Factor Authentication — requires multiple proof types to verify identity','Manual Firewall Administration — configures firewalls','Master File Access — controls file permissions','Malware Filter Application — blocks viruses'], correct:0, explanation:'Multi-Factor Authentication requires 2+ verification factors (something you know, have, or are), significantly reducing unauthorized access.' },
        { q:'What is the OSI model used for?', options:['Organizing network cable types','Providing a conceptual framework for network communication layers','Classifying malware types','Defining encryption standards'], correct:1, explanation:'The OSI (Open Systems Interconnection) model is a conceptual framework with 7 layers describing how data is transmitted over a network.' },
      ]
    },
    {
      id:'q02', title:'Linux & Networking Basics', icon:'🐧', level:'Beginner', questions:10, passMark:70,
      questions_data: [
        { q:'What command is used to list files in a Linux directory?', options:['dir','list','ls','show'], correct:2, explanation:'ls (list) displays files and directories. Use ls -la for detailed output including hidden files.' },
        { q:'Which command shows your current IP address on Linux?', options:['showip','ipconfig','ifconfig / ip addr','netstat'], correct:2, explanation:'ip addr (modern) or ifconfig (legacy) shows network interface information including IP addresses on Linux.' },
        { q:'What does chmod 755 set on a file?', options:['Read-only for everyone','rwxr-xr-x: owner full, group/others read+execute','No permissions','Full permissions for everyone'], correct:1, explanation:'chmod 755 = rwxr-xr-x. 7=rwx for owner, 5=r-x for group, 5=r-x for others.' },
        { q:'What layer of the OSI model does TCP operate at?', options:['Layer 2 (Data Link)','Layer 3 (Network)','Layer 4 (Transport)','Layer 7 (Application)'], correct:2, explanation:'TCP operates at Layer 4 (Transport layer). TCP provides reliable, ordered delivery of data.' },
        { q:'What does DNS stand for and what does it do?', options:['Data Network Security — encrypts traffic','Domain Name System — resolves hostnames to IP addresses','Distributed Network Service — shares files','Dynamic Node Selection — routes packets'], correct:1, explanation:'DNS (Domain Name System) translates human-readable hostnames (google.com) into IP addresses.' },
        { q:'What is the default SSH port?', options:['21','22','23','25'], correct:1, explanation:'SSH (Secure Shell) uses port 22 by default. Changing it is a common security hardening step.' },
        { q:'What is a subnet mask used for?', options:['Encrypting traffic','Hiding your IP address','Defining the network and host portions of an IP address','Assigning IP addresses automatically'], correct:2, explanation:'A subnet mask divides an IP address into network and host portions, defining the network boundary.' },
        { q:'Which command would you use to find running processes in Linux?', options:['proc','ps aux / top','list proc','show processes'], correct:1, explanation:'ps aux lists all running processes. top/htop provides a live, interactive view of processes.' },
        { q:'What is the loopback address?', options:['0.0.0.0','255.255.255.255','127.0.0.1','192.168.1.1'], correct:2, explanation:'127.0.0.1 (localhost) is the loopback address — it refers to the local machine and never leaves the network interface.' },
        { q:'What does grep do in Linux?', options:['Downloads files from the internet','Searches for patterns in text','Manages user accounts','Monitors network traffic'], correct:1, explanation:'grep searches for patterns in files or streams. Example: cat log.txt | grep "error" finds all lines containing "error".' },
      ]
    },
    {
      id:'q03', title:'Web Security Concepts', icon:'🕸️', level:'Intermediate', questions:10, passMark:80,
      questions_data: [
        { q:'What does XSS stand for and what is it?', options:['Extended Security System — a firewall type','Cross-Site Scripting — injecting malicious scripts into trusted websites','External Security Standard — a compliance framework','XML Script Syntax — a coding standard'], correct:1, explanation:'XSS (Cross-Site Scripting) allows attackers to inject client-side scripts into web pages viewed by other users.' },
        { q:'What is SQL Injection?', options:['Adding SQL to a database for optimization','Inserting malicious SQL code into a query to manipulate a database','A method for backing up databases','Encrypting database connections'], correct:1, explanation:'SQL injection inserts malicious SQL into application queries, potentially exposing or modifying database content.' },
        { q:'What does CSRF stand for?', options:['Cross-Site Request Forgery','Centralized Security Reference File','Cyber Security Response Form','Cross-Server Resource Fetch'], correct:0, explanation:'CSRF tricks authenticated users into unknowingly submitting malicious requests to a web application they\'re logged into.' },
        { q:'What HTTP header helps prevent clickjacking?', options:['Content-Type','X-Frame-Options','Authorization','Cache-Control'], correct:1, explanation:'X-Frame-Options (and Content-Security-Policy frame-ancestors) prevents a page from being embedded in an iframe — mitigating clickjacking.' },
        { q:'What is IDOR?', options:['Indirect DNS Object Resolution','Insecure Direct Object Reference — accessing objects users aren\'t authorized to see','Internal Data Object Registry','Internet Domain Object Record'], correct:1, explanation:'IDOR (Insecure Direct Object Reference) occurs when an application exposes a reference to an internal object (like a user ID) without proper authorization checks.' },
        { q:'What is a WAF?', options:['Wireless Access Framework','Web Application Firewall — monitors HTTP/S traffic to detect and block attacks','Wide Area File system','Windows Authentication Framework'], correct:1, explanation:'A WAF (Web Application Firewall) monitors, filters, and blocks HTTP traffic to and from a web application, protecting against common attacks.' },
        { q:'What does HTTPS provide that HTTP does not?', options:['Faster loading speeds','Encrypted communication via TLS/SSL','Better caching','Automatic authentication'], correct:1, explanation:'HTTPS encrypts data in transit using TLS, preventing interception and tampering. HTTP sends data in plain text.' },
        { q:'What is the purpose of a Content Security Policy (CSP)?', options:['Control what content editors can publish','Prevent browsers from loading unauthorized resources, mitigating XSS','Encrypt database content','Manage user session timeouts'], correct:1, explanation:'CSP is an HTTP header that tells browsers which resources are allowed to load, significantly reducing XSS attack surfaces.' },
        { q:'What does OWASP stand for?', options:['Open Web Application Security Project','Official Web Attack Security Protocol','Online Website Audit Security Program','Open Wireless Application Security Platform'], correct:0, explanation:'OWASP (Open Web Application Security Project) is a nonprofit that publishes the famous Top 10 list of the most critical web application security risks.' },
        { q:'What is broken authentication?', options:['When a login page fails to load','Security flaws in auth mechanisms that allow attackers to compromise credentials or sessions','When passwords are stored in plain text only','Authentication that uses outdated algorithms'], correct:1, explanation:'Broken authentication encompasses flaws in login, session management, and credential handling — enabling attackers to assume other users\' identities.' },
      ]
    },
    {
      id:'q04', title:'Tools & Pentest Methodology', icon:'🎯', level:'Advanced', questions:10, passMark:80,
      questions_data: [
        { q:'What is the primary use of Nmap?', options:['Password cracking','Network discovery and security auditing via port scanning','Web application testing','Wireless packet capture'], correct:1, explanation:'Nmap (Network Mapper) is used for network discovery, host detection, port scanning, service enumeration, and OS detection.' },
        { q:'In penetration testing, what does "scope" mean?', options:['The size of the security team','The clearly defined systems and actions that are authorized for testing','The depth of vulnerability scanning','The time limit for an engagement'], correct:1, explanation:'Scope defines exactly what systems, networks, and techniques are authorized. Testing outside scope is illegal.' },
        { q:'What is Wireshark used for?', options:['Web application vulnerability scanning','Packet capture and network traffic analysis','Password hash cracking','Automated exploitation'], correct:1, explanation:'Wireshark is a network protocol analyser that captures and interactively examines network traffic in real time.' },
        { q:'What is Metasploit Framework?', options:['A firewall configuration tool','A penetration testing framework for exploiting known vulnerabilities in authorized environments','An antivirus solution','A network monitoring system'], correct:1, explanation:'Metasploit is an open-source penetration testing framework used to develop, test, and execute exploit code against authorized targets.' },
        { q:'What does "footprinting" mean in pentesting?', options:['Leaving traces in log files','The initial phase of gathering information about a target','Physically accessing a location','Installing a backdoor'], correct:1, explanation:'Footprinting (reconnaissance) is gathering as much information as possible about a target before attempting exploitation.' },
        { q:'What is the kill chain in cybersecurity?', options:['A way to terminate running processes','A model describing stages of a cyberattack from reconnaissance to exfiltration','A firewall rule chain','A sequence for incident response'], correct:1, explanation:'The Cyber Kill Chain (Lockheed Martin) describes attack stages: Reconnaissance → Weaponization → Delivery → Exploitation → Installation → C2 → Actions on Objective.' },
        { q:'What does "privilege escalation" mean?', options:['Requesting more system resources','Gaining higher-level permissions than originally granted','Adding more users to a system','Increasing network bandwidth'], correct:1, explanation:'Privilege escalation is gaining higher access privileges — horizontal (same level, different user) or vertical (user → admin).' },
        { q:'What is a penetration test report\'s primary purpose?', options:['To impress the client with technical jargon','To document findings, evidence, risk ratings, and actionable remediation steps','To list all tested IP addresses','To describe the tools used'], correct:1, explanation:'A pentest report communicates vulnerabilities found, their risk/impact, evidence (screenshots, PoC), and clear remediation recommendations to the client.' },
        { q:'What is the difference between vulnerability scanning and penetration testing?', options:['They are the same thing','Scanning automatically identifies potential vulnerabilities; pentesting actively exploits them in authorized environments','Scanning is illegal; pentesting is not','Pentesting is automated; scanning is manual'], correct:1, explanation:'Vulnerability scanning identifies and reports known vulnerabilities automatically. Penetration testing actively exploits vulnerabilities to demonstrate real-world risk, requiring skilled human testers.' },
        { q:'What does CVSS score measure?', options:['The age of a vulnerability','The severity of a security vulnerability on a 0-10 scale','The number of systems affected','The complexity of an exploit tool'], correct:1, explanation:'CVSS (Common Vulnerability Scoring System) provides a 0-10 numerical score representing vulnerability severity, considering base, temporal, and environmental factors.' },
      ]
    },
  ],

  leaderboard: [
    { name:'ghost_byte', initials:'GB', xp:48200, level:'Advanced', badges:12, rank:1 },
    { name:'n3xt_l3vel', initials:'NL', xp:44100, level:'Advanced', badges:11, rank:2 },
    { name:'sec_hunter', initials:'SH', xp:41800, level:'Advanced', badges:10, rank:3 },
    { name:'kali_queen', initials:'KQ', xp:38500, level:'Advanced', badges:9, rank:4 },
    { name:'0day_d3v', initials:'OD', xp:35200, level:'Advanced', badges:8, rank:5 },
    { name:'root_access', initials:'RA', xp:31400, level:'Intermediate', badges:7, rank:6 },
    { name:'packet_rat', initials:'PR', xp:28900, level:'Intermediate', badges:7, rank:7 },
    { name:'cipher_wolf', initials:'CW', xp:25600, level:'Intermediate', badges:6, rank:8 },
    { name:'nmap_ninja', initials:'NN', xp:22100, level:'Intermediate', badges:5, rank:9 },
    { name:'blue_team_x', initials:'BT', xp:18400, level:'Intermediate', badges:5, rank:10 },
    { name:'ctf_seeker', initials:'CS', xp:15200, level:'Beginner', badges:4, rank:11 },
    { name:'null_ptr_r', initials:'NP', xp:12800, level:'Beginner', badges:3, rank:12 },
    { name:'l1nux_lair', initials:'LL', xp:9600, level:'Beginner', badges:3, rank:13 },
    { name:'byte_buster', initials:'BB', xp:7400, level:'Beginner', badges:2, rank:14 },
    { name:'new_recruit', initials:'NR', xp:4200, level:'Beginner', badges:1, rank:15 },
  ],

  badges: [
    { id:'b01', name:'First Boot', icon:'💻', req:'Complete your first lesson', earned:true, xp:50 },
    { id:'b02', name:'Beginner Badge', icon:'🌱', req:'Complete the Foundations path', earned:false, xp:200 },
    { id:'b03', name:'Linux Explorer', icon:'🐧', req:'Complete all 3 Linux courses', earned:false, xp:300 },
    { id:'b04', name:'Network Navigator', icon:'🌐', req:'Complete Networking + score 90%+ on quiz', earned:false, xp:350 },
    { id:'b05', name:'Web Warrior', icon:'🕸️', req:'Complete Web Security Fundamentals + Web lab', earned:false, xp:400 },
    { id:'b06', name:'CTF Champion', icon:'🚩', req:'Complete 5 CTF challenges', earned:false, xp:500 },
    { id:'b07', name:'Security Analyst', icon:'📊', req:'Complete Intermediate path with 85%+ average', earned:false, xp:600 },
    { id:'b08', name:'Script Kiddie → No More', icon:'💀', req:'Complete Terminal Mastery + write a security script', earned:false, xp:400 },
    { id:'b09', name:'Ethical Hacker', icon:'🎯', req:'Complete Advanced path certification exam', earned:false, xp:1000 },
    { id:'b10', name:'Cyber Champion', icon:'🏆', req:'Complete all 3 paths + 10 labs + 4 quizzes', earned:false, xp:2000 },
    { id:'b11', name:'Bug Hunter', icon:'🐛', req:'Discover and report a valid bug in the academy CTF', earned:false, xp:750 },
    { id:'b12', name:'Speed Runner', icon:'⚡', req:'Complete any lab in under 30 minutes', earned:false, xp:300 },
  ],

  achievements: [
    { name:'First Login', desc:'Create your account', icon:'👤', xp:'+10 XP', progress:100, max:100 },
    { name:'Lab Rat', desc:'Complete 10 practice labs', icon:'🧪', xp:'+500 XP', progress:3, max:10 },
    { name:'Quiz Master', desc:'Pass 4 quizzes with 90%+', icon:'📝', xp:'+400 XP', progress:1, max:4 },
    { name:'Night Owl', desc:'Study for 5 hours in one day', icon:'🦉', xp:'+200 XP', progress:2.5, max:5 },
    { name:'Streak Keeper', desc:'Log in for 30 consecutive days', icon:'🔥', xp:'+1000 XP', progress:7, max:30 },
    { name:'Course Crusher', desc:'Complete 10 courses', icon:'📚', xp:'+800 XP', progress:2, max:10 },
    { name:'CTF Veteran', desc:'Complete 10 CTF challenges', icon:'🚩', xp:'+1500 XP', progress:1, max:10 },
    { name:'Community Pillar', desc:'Help 20 students in Discord', icon:'🤝', xp:'+500 XP', progress:8, max:20 },
  ],

  videos: [
    { id:'v01', title:'Linux Command Line Crash Course', desc:'Master essential Linux commands used daily by security professionals.', duration:'1:24:32', level:'Beginner', topic:'linux', icon:'🐧', url:'https://www.youtube.com/watch?v=oxuRxtrO2Ag', channel:'NetworkChuck' },
    { id:'v02', title:'Networking Fundamentals for Hackers', desc:'TCP/IP, DNS, DHCP, and how they are exploited — explained clearly.', duration:'2:05:18', level:'Beginner', topic:'networking', icon:'🌐', url:'https://www.youtube.com/watch?v=qiQR5rTSshw', channel:'Professor Messer' },
    { id:'v03', title:'Introduction to Ethical Hacking', desc:'Full introduction to the ethical hacking mindset, methodology, and career.', duration:'1:46:45', level:'Beginner', topic:'concepts', icon:'🔐', url:'https://www.youtube.com/watch?v=3Kq1MIfTWCE', channel:'freeCodeCamp' },
    { id:'v04', title:'Kali Linux Full Setup Guide 2024', desc:'Install, configure, and customize Kali Linux for penetration testing.', duration:'52:18', level:'Beginner', topic:'linux', icon:'🐉', url:'https://www.youtube.com/watch?v=lZAoFs75_cs', channel:'NetworkChuck' },
    { id:'v05', title:'Nmap Tutorial — Complete Guide', desc:'Every Nmap flag, scan type, and technique explained with live demos.', duration:'1:12:44', level:'Intermediate', topic:'tools', icon:'🗺️', url:'https://www.youtube.com/watch?v=4t4kBkMsDbQ', channel:'HackerSploit' },
    { id:'v06', title:'Wireshark Full Tutorial for Beginners', desc:'Capture, filter, and analyse network traffic step by step.', duration:'1:08:22', level:'Intermediate', topic:'tools', icon:'🦈', url:'https://www.youtube.com/watch?v=OU-A2EmVrKQ', channel:'David Bombal' },
    { id:'v07', title:'Burp Suite Complete Masterclass', desc:'Intercepting proxies, active scanning, and web app testing with Burp Suite Community Edition.', duration:'2:28:15', level:'Intermediate', topic:'tools', icon:'🐛', url:'https://www.youtube.com/watch?v=G3hpAeoZ4ek', channel:'HackerSploit' },
    { id:'v08', title:'Ethical Hacking Full Course', desc:'12-hour comprehensive ethical hacking course covering the entire CEH curriculum.', duration:'12:00:00', level:'Intermediate', topic:'concepts', icon:'🎯', url:'https://www.youtube.com/watch?v=fNzpcB7ODxQ', channel:'freeCodeCamp' },
    { id:'v09', title:'OWASP Top 10 Explained with Demos', desc:'Every OWASP Top 10 vulnerability demonstrated hands-on in a real lab.', duration:'1:55:30', level:'Intermediate', topic:'tools', icon:'🕸️', url:'https://www.youtube.com/watch?v=rWHvp7rUka8', channel:'TCM Security' },
    { id:'v10', title:'Metasploit Framework Tutorial', desc:'Learn Metasploit in an authorized lab: modules, payloads, and post-exploitation concepts.', duration:'1:32:08', level:'Advanced', topic:'tools', icon:'💥', url:'https://www.youtube.com/watch?v=8lR27r8Y_ik', channel:'HackerSploit' },
    { id:'v11', title:'Privilege Escalation on Linux', desc:'The most common Linux PrivEsc techniques used in CTFs and real pentests.', duration:'1:18:54', level:'Advanced', topic:'concepts', icon:'⬆️', url:'https://www.youtube.com/watch?v=DkHjOgSBIRs', channel:'TCM Security' },
    { id:'v12', title:'Digital Forensics with Autopsy', desc:'Conduct a full digital forensics investigation using Autopsy and open-source tools.', duration:'58:22', level:'Advanced', topic:'tools', icon:'🔬', url:'https://www.youtube.com/watch?v=OkHBKq6xnHo', channel:'13Cubed' },
  ],

  tools: [
    {
      id:'t01', name:'Nmap', icon:'🗺️', category:'Network Discovery & Scanning',
      purpose:'Nmap (Network Mapper) is the industry-standard open-source tool for network exploration and security auditing. It discovers hosts, maps open ports, identifies running services and versions, detects operating systems, and can run scripts for vulnerability detection.',
      tags:['Network Scanning','Host Discovery','Port Scanning','Service Detection','OS Fingerprinting'],
      level:'Intermediate',
      install:'# On Debian/Ubuntu/Kali (usually pre-installed on Kali)\nsudo apt-get install nmap\n\n# On macOS via Homebrew\nbrew install nmap\n\n# Official download: https://nmap.org/download',
      commands:[
        { cmd:'nmap -sV 192.168.1.1', desc:'Scan a single host and detect service versions' },
        { cmd:'nmap -sV -sC -p- 10.10.10.1', desc:'Full port scan with default scripts (use only on authorized targets)' },
        { cmd:'nmap -sn 192.168.1.0/24', desc:'Ping scan to discover live hosts in a subnet' },
        { cmd:'nmap -O 192.168.1.1', desc:'Attempt OS detection on a host' },
        { cmd:'nmap --script vuln 192.168.1.1', desc:'Run vulnerability detection scripts (authorized use only)' },
      ],
      safety:'Only scan systems you own or have explicit written permission to test. Unauthorized scanning may be illegal under computer misuse laws in your jurisdiction. Always define the scope before any security assessment.'
    },
    {
      id:'t02', name:'Wireshark', icon:'🦈', category:'Network Protocol Analyser',
      purpose:'Wireshark is the world\'s most widely used network protocol analyser. It captures network packets in real time and lets you inspect them at a microscopic level. Used by security professionals, network engineers, and developers to troubleshoot issues and understand network behaviour.',
      tags:['Packet Capture','Traffic Analysis','Protocol Inspection','PCAP Analysis','Network Forensics'],
      level:'Intermediate',
      install:'# On Kali/Ubuntu\nsudo apt-get install wireshark\n\n# On macOS\nbrew install --cask wireshark\n\n# Official download: https://www.wireshark.org/download.html',
      commands:[
        { cmd:'ip.addr == 192.168.1.1', desc:'Filter traffic to/from a specific IP address' },
        { cmd:'tcp.port == 80', desc:'Show only HTTP traffic' },
        { cmd:'http.request', desc:'Display all HTTP requests' },
        { cmd:'frame contains "password"', desc:'Search all packets for the string "password"' },
        { cmd:'!(arp || icmp || dns)', desc:'Hide common noise to focus on interesting traffic' },
      ],
      safety:'Only capture traffic on networks you own or have explicit permission to monitor. Capturing others\' traffic without permission violates wiretapping laws in most countries. On corporate networks, always obtain written authorization.'
    },
    {
      id:'t03', name:'Burp Suite CE', icon:'🐛', category:'Web Application Security Testing',
      purpose:'Burp Suite Community Edition is the go-to tool for web application security testing. It acts as a proxy between your browser and web applications, allowing you to intercept, inspect, and modify HTTP/S requests and responses.',
      tags:['Web App Testing','HTTP Proxy','Request Interception','Security Scanner','OWASP Top 10'],
      level:'Intermediate',
      install:'# Download: https://portswigger.net/burp/communitydownload\n# Free Community Edition available for all platforms\n\n# Configure your browser to use proxy:\n# HTTP Proxy: 127.0.0.1  Port: 8080\n\n# Import Burp CA certificate for HTTPS interception',
      commands:[
        { cmd:'Proxy → Intercept ON', desc:'Capture and modify HTTP requests before they are sent' },
        { cmd:'Right-click → Send to Repeater', desc:'Re-send and modify requests for testing' },
        { cmd:'Right-click → Send to Intruder', desc:'Set up automated parameter fuzzing' },
        { cmd:'Target → Scope → Add', desc:'Define which domains to include in testing' },
        { cmd:'Proxy → HTTP History', desc:'Review all captured HTTP traffic' },
      ],
      safety:'Only use Burp Suite against applications you own or have a signed authorization agreement for. Web app testing against live production systems without permission is illegal. Use PortSwigger\'s free Web Security Academy labs for practice.'
    },
    {
      id:'t04', name:'Metasploit Framework', icon:'💥', category:'Penetration Testing Framework',
      purpose:'Metasploit Framework is the world\'s most widely used penetration testing framework. It provides a repository of known exploit modules that can be used against authorized targets to demonstrate vulnerability. Understanding it is essential for any professional penetration tester.',
      tags:['Exploitation','Payload Generation','Post-Exploitation','Vulnerability Verification','Pentest'],
      level:'Advanced',
      install:'# Pre-installed on Kali Linux\n# Start the database\nsudo msfdb init\n\n# Launch Metasploit\nmsfconsole\n\n# Update modules\nmsfupdate',
      commands:[
        { cmd:'search type:exploit name:eternal', desc:'Search for exploit modules by keyword' },
        { cmd:'use exploit/windows/smb/ms17_010_eternalblue', desc:'Select a specific exploit module' },
        { cmd:'show options', desc:'Display required configuration for the selected module' },
        { cmd:'set RHOSTS 10.10.10.40', desc:'Set target host (authorized target ONLY)' },
        { cmd:'set payload windows/x64/meterpreter/reverse_tcp', desc:'Select a payload to use' },
      ],
      safety:'Metasploit must ONLY be used against systems you own or have explicit written authorization to test. Using it against live systems without permission is a serious criminal offence in all jurisdictions. Always operate within defined scope.'
    },
    {
      id:'t05', name:'John the Ripper', icon:'🔓', category:'Password Security Testing',
      purpose:'John the Ripper is a fast password security auditing and recovery tool. It supports hundreds of hash types and multiple cracking modes. Security professionals use it to test password strength policies and verify that compromised credential databases have been properly secured.',
      tags:['Password Auditing','Hash Cracking','Security Testing','Dictionary Attack','Rule-Based'],
      level:'Intermediate',
      install:'# On Kali (pre-installed)\njohn --version\n\n# Install community version\nsudo apt-get install john\n\n# Jumbo version with more formats:\n# https://www.openwall.com/john/',
      commands:[
        { cmd:'john --format=raw-md5 hashes.txt', desc:'Crack MD5 hashes using the default wordlist' },
        { cmd:'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt', desc:'Dictionary attack with a specific wordlist' },
        { cmd:'john --rules --wordlist=words.txt hashes.txt', desc:'Apply transformation rules to the wordlist' },
        { cmd:'john --show hashes.txt', desc:'Display previously cracked passwords' },
        { cmd:'john --list=formats', desc:'List all supported hash formats' },
      ],
      safety:'John the Ripper must only be used on password hashes from systems you own or are authorized to test. Using it to crack credentials for unauthorized access is illegal. In professional security work, it helps verify password policy effectiveness.'
    },
    {
      id:'t06', name:'Aircrack-ng Suite', icon:'📡', category:'Wi-Fi Security Auditing (Authorized Labs Only)',
      purpose:'Aircrack-ng is a suite of tools for assessing Wi-Fi network security in authorized environments. It covers monitoring, attacking (in lab contexts), testing, and cracking 802.11 WEP and WPA/WPA2-PSK. Used by security professionals to assess wireless security posture with permission.',
      tags:['Wireless Security','WPA2 Auditing','Packet Injection','Monitor Mode','Authorized Lab Use'],
      level:'Advanced',
      install:'# On Kali (pre-installed)\naircrack-ng --version\n\n# Install on Ubuntu\nsudo apt-get install aircrack-ng\n\n# Requires a wireless adapter that supports monitor mode and packet injection',
      commands:[
        { cmd:'sudo airmon-ng start wlan0', desc:'Put wireless adapter into monitor mode' },
        { cmd:'sudo airodump-ng wlan0mon', desc:'Scan for nearby networks (monitor mode only)' },
        { cmd:'sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon', desc:'Capture traffic from a specific authorized AP' },
        { cmd:'aircrack-ng -w /usr/share/wordlists/rockyou.txt capture.cap', desc:'Test a captured handshake against a wordlist (your own AP only)' },
        { cmd:'sudo airmon-ng stop wlan0mon', desc:'Return adapter to managed mode' },
      ],
      safety:'CRITICAL: Only use Aircrack-ng on Wi-Fi networks you own or have explicit written permission to test. Unauthorized interception of wireless communications is a serious criminal offence under laws including the CFAA, Computer Misuse Act, and equivalents worldwide.'
    },
  ],
};

/* Search index for global search */
const SEARCH_INDEX = [
  ...DATA.courses.map(c => ({ type:'Course', label:c.title, section:'courses', id:c.id })),
  ...DATA.labs.map(l => ({ type:'Lab', label:l.name, section:'labs', id:l.id })),
  ...DATA.videos.map(v => ({ type:'Video', label:v.title, section:'videos', id:v.id })),
  ...DATA.tools.map(t => ({ type:'Tool', label:t.name, section:'tools', id:t.id })),
  { type:'Page', label:'Learning Paths', section:'learning-paths' },
  { type:'Page', label:'Quizzes & Exams', section:'quizzes' },
  { type:'Page', label:'Leaderboard', section:'leaderboard' },
  { type:'Page', label:'Badges & Achievements', section:'badges' },
  { type:'Page', label:'About Us', section:'about' },
  { type:'Page', label:'Contact', section:'contact' },
];

/* ============================================================
   APP STATE
   ============================================================ */
const STATE = {
  currentSection: 'home',
  activeQuiz: null,
  currentQuestion: 0,
  score: 0,
  answered: false,
  quizStartedId: null,
};

/* ============================================================
   LOADER
   ============================================================ */
const LOADER_MESSAGES = [
  'Initializing systems...',
  'Loading security modules...',
  'Configuring lab environment...',
  'Establishing encrypted connection...',
  'Systems online.',
];

function runLoader() {
  const fill = document.querySelector('.loader-fill');
  const status = document.getElementById('loader-status');
  const loader = document.getElementById('loader');
  if (!loader) return;

  let step = 0;
  const steps = LOADER_MESSAGES.length;

  const interval = setInterval(() => {
    if (step < steps) {
      if (fill) fill.style.width = `${((step + 1) / steps) * 100}%`;
      if (status) status.textContent = LOADER_MESSAGES[step];
      step++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        startCounters();
        animateTerminal();
      }, 400);
    }
  }, 350);
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function navigateTo(section) {
  if (STATE.currentSection === section) return;

  // Hide current
  const current = document.getElementById(STATE.currentSection);
  if (current) { current.hidden = true; current.classList.remove('active'); }

  // Show new
  const next = document.getElementById(section);
  if (!next) return;
  next.hidden = false;
  next.classList.add('active');

  // Trigger re-render if needed
  if (section === 'home') renderFeaturedCourses();
  if (section === 'courses') renderAllCourses();
  if (section === 'labs') renderLabs();
  if (section === 'quizzes') renderQuizSelector();
  if (section === 'leaderboard') renderLeaderboard('weekly');
  if (section === 'badges') renderBadges();
  if (section === 'videos') renderVideos();
  if (section === 'tools') renderTools();
  if (section === 'achievements') renderAchievements();

  STATE.currentSection = section;

  // Update nav
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === section);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close mobile nav
  const nav = document.getElementById('main-nav');
  const ham = document.getElementById('hamburger');
  if (nav && nav.classList.contains('open')) {
    nav.classList.remove('open');
    if (ham) { ham.classList.remove('active'); ham.setAttribute('aria-expanded', 'false'); }
  }

  // Update URL hash
  history.pushState(null, '', `#${section}`);
}

window.navigateTo = navigateTo;

/* ============================================================
   COUNTERS ANIMATION
   ============================================================ */
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const startVal = 0;

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);

    el.textContent = current >= 1000
      ? current.toLocaleString() + '+'
      : current.toLocaleString();

    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString() + (target >= 100 ? '+' : '');
  }

  requestAnimationFrame(tick);
}

function startCounters() {
  const counterEls = document.querySelectorAll('.stat-num[data-count], .mini-num[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterEls.forEach(el => observer.observe(el));
}

/* ============================================================
   TERMINAL ANIMATION
   ============================================================ */
const TERMINAL_SEQUENCE = [
  { type:'prompt', text:'root@cyberlab:~# ', cmd:'nmap -sV 192.168.1.0/24' },
  { type:'output', text:'Starting Nmap 7.92 ( https://nmap.org )' },
  { type:'output', text:'Scanning 256 hosts [1000 ports/host]' },
  { type:'output', text:'Discovered: 192.168.1.1 → Port 80/tcp Apache 2.4.51' },
  { type:'output', text:'Discovered: 192.168.1.5 → Port 22/tcp OpenSSH 8.2' },
  { type:'output', text:'Discovered: 192.168.1.12 → Port 3306/tcp MySQL 8.0' },
  { type:'output', text:'Nmap done: 3 hosts up, 18 ports scanned' },
  { type:'prompt', text:'root@cyberlab:~# ', cmd:'wireshark -i eth0 &' },
  { type:'output', text:'[ Launching Wireshark GUI... ]' },
  { type:'output', text:'Capturing packets on eth0...' },
];

function animateTerminal() {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  body.innerHTML = '';
  let i = 0;

  function nextLine() {
    if (i >= TERMINAL_SEQUENCE.length) {
      i = 0;
      setTimeout(nextLine, 3000);
      return;
    }

    const item = TERMINAL_SEQUENCE[i];
    const line = document.createElement('div');
    line.className = `term-line ${item.type === 'output' ? 'output' : ''}`;

    if (item.type === 'prompt') {
      line.innerHTML = `<span class="prompt">${item.text}</span><span class="cmd"></span>`;
      body.appendChild(line);
      const cmdSpan = line.querySelector('.cmd');
      typeText(cmdSpan, item.cmd, 40, () => { i++; setTimeout(nextLine, 300); });
    } else {
      line.innerHTML = `<span style="color:var(--text-secondary)">${item.text}</span>`;
      body.appendChild(line);
      i++;
      if (body.children.length > 8) body.removeChild(body.children[0]);
      setTimeout(nextLine, 200);
    }
  }

  nextLine();
}

function typeText(el, text, speed, callback) {
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) { clearInterval(interval); if (callback) callback(); }
  }, speed);
}

/* ============================================================
   RENDER: COURSES
   ============================================================ */
const COURSE_THUMB_COLORS = {
  beginner:     'linear-gradient(135deg, rgba(0,255,136,0.12), rgba(0,255,136,0.04))',
  intermediate: 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(0,229,255,0.04))',
  advanced:     'linear-gradient(135deg, rgba(255,0,170,0.12), rgba(255,0,170,0.04))',
};

function renderCourseCard(course) {
  return `
    <article class="course-card" data-level="${course.level}" data-id="${course.id}" role="button" tabindex="0" aria-label="View ${course.title} course" onclick="showToast('${course.title} — Opening course preview…','success')">
      <div class="course-thumb" style="background:${COURSE_THUMB_COLORS[course.level]}">
        <span style="font-size:3rem;z-index:1;position:relative">${course.icon}</span>
      </div>
      <div class="course-body">
        <div class="course-level level-${course.level}">${course.level.toUpperCase()}</div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-desc">${course.desc}</p>
        <div class="course-meta">
          <span>📚 ${course.modules} modules</span>
          <span>⏱ ${course.duration}</span>
          <span class="course-xp">⚡ ${course.xp} XP</span>
        </div>
      </div>
    </article>`;
}

function renderFeaturedCourses() {
  const grid = document.getElementById('featured-courses-grid');
  if (!grid || grid.dataset.rendered) return;
  const featured = DATA.courses.slice(0, 6);
  grid.innerHTML = featured.map(renderCourseCard).join('');
  grid.dataset.rendered = '1';
}

function renderAllCourses(filter = 'all', query = '') {
  const grid = document.getElementById('all-courses-grid');
  if (!grid) return;

  let courses = DATA.courses;
  if (filter !== 'all') courses = courses.filter(c => c.level === filter);
  if (query) {
    const q = query.toLowerCase();
    courses = courses.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  }

  grid.innerHTML = courses.length
    ? courses.map(renderCourseCard).join('')
    : '<p style="color:var(--text-secondary);text-align:center;padding:3rem">No courses match your search. Try a different filter.</p>';
}

/* ============================================================
   RENDER: LABS
   ============================================================ */
function renderLabs(filter = 'all') {
  const grid = document.getElementById('labs-grid');
  if (!grid) return;

  const labs = filter === 'all' ? DATA.labs : DATA.labs.filter(l => l.type === filter);

  grid.innerHTML = labs.map(lab => `
    <article class="lab-card" data-type="${lab.type}" onclick="showToast('${lab.name} — Launching virtual lab…','success')">
      <div class="lab-header">
        <span class="lab-icon">${lab.icon}</span>
        <span class="lab-difficulty diff-${lab.difficulty}">${lab.difficulty.toUpperCase()}</span>
      </div>
      <div class="lab-name">${lab.name}</div>
      <p class="lab-desc">${lab.desc}</p>
      <div class="progress-bar" aria-label="${lab.progress}% complete">
        <div class="progress-fill" style="width:${lab.progress}%"></div>
      </div>
      <div class="lab-footer">
        <span>⏱ ${lab.duration}</span>
        <span class="lab-xp">⚡ ${lab.xp} XP</span>
      </div>
    </article>`).join('');
}

/* ============================================================
   RENDER: QUIZZES
   ============================================================ */
function renderQuizSelector() {
  const grid = document.getElementById('quiz-selector');
  if (!grid) return;

  const areaEl = document.getElementById('quiz-area');
  if (areaEl) areaEl.hidden = false;
  const activeEl = document.getElementById('active-quiz');
  if (activeEl) activeEl.hidden = true;
  const resultsEl = document.getElementById('quiz-results');
  if (resultsEl) resultsEl.hidden = true;

  grid.innerHTML = DATA.quizzes.map(q => `
    <div class="quiz-select-card" role="button" tabindex="0" onclick="startQuiz('${q.id}')" onkeydown="if(event.key==='Enter')startQuiz('${q.id}')">
      <div class="quiz-card-icon">${q.icon}</div>
      <h3 class="quiz-card-title">${q.title}</h3>
      <div class="quiz-card-meta">
        <span>📝 ${q.questions} Questions</span>
        <span>🏅 Pass: ${q.passMark}%</span>
        <span class="course-level level-${q.level.toLowerCase()}">${q.level}</span>
      </div>
    </div>`).join('');
}

function startQuiz(quizId) {
  const quiz = DATA.quizzes.find(q => q.id === quizId);
  if (!quiz) return;

  STATE.activeQuiz = quiz;
  STATE.currentQuestion = 0;
  STATE.score = 0;
  STATE.answered = false;
  STATE.quizStartedId = quizId;

  document.getElementById('quiz-area').hidden = true;
  document.getElementById('quiz-results').hidden = true;
  document.getElementById('active-quiz').hidden = false;
  document.getElementById('quiz-title').textContent = quiz.title;

  renderQuestion();
}

window.startQuiz = startQuiz;

function renderQuestion() {
  const quiz = STATE.activeQuiz;
  const qData = quiz.questions_data[STATE.currentQuestion];
  const total = quiz.questions_data.length;

  document.getElementById('quiz-q-counter').textContent = `Question ${STATE.currentQuestion + 1} of ${total}`;
  document.getElementById('quiz-score-display').textContent = `Score: ${STATE.score}`;
  document.getElementById('quiz-progress-fill').style.width = `${((STATE.currentQuestion) / total) * 100}%`;
  document.getElementById('question-text').textContent = qData.q;

  const optGrid = document.getElementById('options-grid');
  optGrid.innerHTML = qData.options.map((opt, i) => `
    <button class="option-btn" data-index="${i}" onclick="selectOption(${i})">${opt}</button>
  `).join('');

  const feedback = document.getElementById('quiz-feedback');
  feedback.className = 'quiz-feedback';
  feedback.textContent = '';

  const nextBtn = document.getElementById('quiz-next-btn');
  nextBtn.disabled = true;
  nextBtn.textContent = STATE.currentQuestion < total - 1 ? 'Next →' : 'Finish Quiz';
  STATE.answered = false;
}

window.selectOption = function(index) {
  if (STATE.answered) return;
  STATE.answered = true;

  const qData = STATE.activeQuiz.questions_data[STATE.currentQuestion];
  const buttons = document.querySelectorAll('.option-btn');
  const feedback = document.getElementById('quiz-feedback');

  buttons.forEach(btn => btn.disabled = true);

  if (index === qData.correct) {
    STATE.score++;
    buttons[index].classList.add('correct');
    feedback.className = 'quiz-feedback correct';
    feedback.textContent = `✅ Correct! ${qData.explanation}`;
  } else {
    buttons[index].classList.add('wrong');
    buttons[qData.correct].classList.add('correct');
    feedback.className = 'quiz-feedback wrong';
    feedback.textContent = `❌ Incorrect. ${qData.explanation}`;
  }

  document.getElementById('quiz-next-btn').disabled = false;
  document.getElementById('quiz-score-display').textContent = `Score: ${STATE.score}`;
};

function setupQuizNavigation() {
  const nextBtn = document.getElementById('quiz-next-btn');
  const backBtn = document.getElementById('quiz-back-btn');
  const retryBtn = document.getElementById('retry-quiz');

  if (nextBtn) nextBtn.addEventListener('click', () => {
    const total = STATE.activeQuiz.questions_data.length;
    if (STATE.currentQuestion < total - 1) {
      STATE.currentQuestion++;
      renderQuestion();
    } else {
      showQuizResults();
    }
  });

  if (backBtn) backBtn.addEventListener('click', () => {
    document.getElementById('active-quiz').hidden = true;
    document.getElementById('quiz-area').hidden = false;
  });

  if (retryBtn) retryBtn.addEventListener('click', () => {
    if (STATE.quizStartedId) {
      document.getElementById('quiz-results').hidden = true;
      startQuiz(STATE.quizStartedId);
    }
  });
}

function showQuizResults() {
  const quiz = STATE.activeQuiz;
  const total = quiz.questions_data.length;
  const pct = Math.round((STATE.score / total) * 100);
  const passed = pct >= quiz.passMark;

  document.getElementById('active-quiz').hidden = true;
  const resultsEl = document.getElementById('quiz-results');
  resultsEl.hidden = false;

  document.getElementById('result-icon').textContent = passed ? '🏆' : '📚';
  document.getElementById('result-title').textContent = passed ? 'Quiz Passed!' : 'Keep Learning';
  document.getElementById('result-score').textContent = `${pct}%`;
  document.getElementById('result-message').textContent = passed
    ? `Excellent work! You scored ${STATE.score}/${total}. You've earned the ${quiz.title} completion badge.`
    : `You scored ${STATE.score}/${total}. You need ${quiz.passMark}% to pass. Review the material and try again — you've got this!`;

  if (passed) showToast(`🏆 Quiz passed! ${pct}% — Badge unlocked!`, 'success');
}

/* ============================================================
   RENDER: LEADERBOARD
   ============================================================ */
function renderLeaderboard(period) {
  const list = document.getElementById('leaderboard-list');
  if (!list) return;

  // Slight variation for different periods
  let lbData = [...DATA.leaderboard];
  if (period === 'weekly') lbData = lbData.map((u, i) => ({ ...u, xp: Math.round(u.xp * 0.08 + Math.random() * 200) })).sort((a, b) => b.xp - a.xp);
  else if (period === 'monthly') lbData = lbData.map((u, i) => ({ ...u, xp: Math.round(u.xp * 0.35 + Math.random() * 500) })).sort((a, b) => b.xp - a.xp);

  list.innerHTML = lbData.map((user, i) => {
    const rank = i + 1;
    const topClass = rank <= 3 ? `top-${rank}` : '';
    const rankDisplay = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
    const lvlClass = user.level === 'Advanced' ? 'lvl-adv' : user.level === 'Intermediate' ? 'lvl-mid' : 'lvl-beg';
    return `
      <div class="lb-row ${topClass}" role="listitem">
        <div class="lb-rank">${rankDisplay}</div>
        <div class="lb-user">
          <div class="lb-avatar">${user.initials}</div>
          <div>
            <div class="lb-name">${user.name}</div>
            <div class="lb-badges-row">🏅 ${user.badges} badges</div>
          </div>
        </div>
        <div class="lb-xp">${user.xp.toLocaleString()} XP</div>
        <div class="lb-level ${lvlClass}">${user.level}</div>
      </div>`;
  }).join('');
}

/* ============================================================
   RENDER: BADGES
   ============================================================ */
function renderBadges() {
  const grid = document.getElementById('badges-grid');
  if (!grid || grid.dataset.rendered) return;

  grid.innerHTML = DATA.badges.map(b => `
    <div class="badge-card ${b.earned ? 'earned' : 'locked'}" role="img" aria-label="${b.name} badge — ${b.earned ? 'Earned' : 'Locked'}">
      <span class="badge-icon">${b.icon}</span>
      <div class="badge-name">${b.name}</div>
      <div class="badge-req">${b.req}</div>
      <div style="font-family:var(--font-mono);font-size:0.68rem;color:var(--amber);margin-top:8px">⚡ ${b.xp} XP</div>
      ${b.earned ? '<div style="color:var(--neon);font-size:0.72rem;margin-top:4px">EARNED ✓</div>' : ''}
    </div>`).join('');

  grid.dataset.rendered = '1';
  renderAchievements();
}

function renderAchievements() {
  const list = document.getElementById('achievements-list');
  if (!list) return;

  list.innerHTML = DATA.achievements.map(a => `
    <div class="achievement-row">
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-info">
        <div class="ach-name">${a.name}</div>
        <div class="ach-desc">${a.desc}</div>
      </div>
      <div class="ach-progress">
        <div class="ach-progress-bar">
          <div class="ach-progress-fill" style="width:${(a.progress / a.max) * 100}%"></div>
        </div>
        <div class="ach-progress-label">${a.progress}/${a.max}</div>
      </div>
      <div class="ach-xp">${a.xp}</div>
    </div>`).join('');
}

/* ============================================================
   RENDER: VIDEOS
   ============================================================ */
function renderVideos(filter = 'all', query = '') {
  const grid = document.getElementById('videos-grid');
  if (!grid) return;

  let videos = DATA.videos;
  if (filter !== 'all') videos = videos.filter(v => v.topic === filter);
  if (query) {
    const q = query.toLowerCase();
    videos = videos.filter(v => v.title.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q));
  }

  grid.innerHTML = videos.map(v => `
    <article class="video-card" onclick="window.open('${v.url}', '_blank', 'noopener,noreferrer')" role="button" tabindex="0" aria-label="Watch ${v.title} on YouTube">
      <div class="video-thumb">
        <div class="video-thumb-bg">${v.icon}</div>
        <div class="play-btn" aria-hidden="true">▶</div>
        <div class="video-duration">${v.duration}</div>
      </div>
      <div class="video-body">
        <div class="video-topic">${v.topic.toUpperCase()}</div>
        <h3 class="video-title">${v.title}</h3>
        <p class="video-desc">${v.desc}</p>
        <div class="video-meta">
          <span>👤 ${v.channel}</span>
          <span class="video-level">📊 ${v.level}</span>
        </div>
      </div>
    </article>`).join('');
}

/* ============================================================
   RENDER: TOOLS
   ============================================================ */
function renderTools() {
  const grid = document.getElementById('tools-grid');
  if (!grid || grid.dataset.rendered) return;

  grid.innerHTML = DATA.tools.map(t => `
    <article class="tool-card" onclick="openToolModal('${t.id}')" role="button" tabindex="0" aria-label="View ${t.name} guide">
      <div class="tool-header">
        <span class="tool-icon">${t.icon}</span>
        <div>
          <div class="tool-name">${t.name}</div>
          <div class="tool-category">${t.category}</div>
        </div>
      </div>
      <div class="tool-body">
        <p class="tool-purpose">${t.purpose.slice(0, 140)}…</p>
        <div class="tool-tags">
          ${t.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="tool-footer">
        <span class="tool-level">📊 ${t.level}</span>
        <button class="btn-outline-neon" style="font-size:0.72rem;padding:4px 12px" onclick="event.stopPropagation();openToolModal('${t.id}')">View Guide →</button>
      </div>
    </article>`).join('');

  grid.dataset.rendered = '1';
}

function openToolModal(toolId) {
  const tool = DATA.tools.find(t => t.id === toolId);
  if (!tool) return;

  const modal = document.getElementById('tool-modal');
  const content = document.getElementById('tool-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="tool-modal-header">
      <span class="tool-modal-icon">${tool.icon}</span>
      <div>
        <div class="tool-modal-name">${tool.name}</div>
        <div class="tool-modal-cat">${tool.category}</div>
      </div>
    </div>
    <div class="tool-modal-body">
      <div class="tool-section">
        <h4>Overview & Purpose</h4>
        <p>${tool.purpose}</p>
      </div>
      <div class="tool-section">
        <h4>Installation</h4>
        <div class="code-block"><code>${tool.install}</code></div>
      </div>
      <div class="tool-section">
        <h4>Common Commands (Authorized Use Only)</h4>
        ${tool.commands.map(c => `
          <div class="code-block" style="margin-bottom:0.5rem">
            <code>${c.cmd}</code>
          </div>
          <p style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:0.75rem;margin-left:4px">↳ ${c.desc}</p>
        `).join('')}
      </div>
      <div class="legal-box">
        <h5>⚠ Legal & Safety Disclaimer</h5>
        <p>${tool.safety}</p>
      </div>
    </div>`;

  modal.hidden = false;
}

window.openToolModal = openToolModal;

/* ============================================================
   FILTERS & SEARCH
   ============================================================ */
function setupFilters() {
  // Course filters
  document.querySelectorAll('#courses .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#courses .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const query = document.getElementById('course-search')?.value || '';
      renderAllCourses(btn.dataset.filter, query);
    });
  });

  const courseSearch = document.getElementById('course-search');
  if (courseSearch) {
    courseSearch.addEventListener('input', () => {
      const active = document.querySelector('#courses .filter-btn.active');
      renderAllCourses(active?.dataset.filter || 'all', courseSearch.value);
    });
  }

  // Lab filters
  document.querySelectorAll('[data-lab-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-lab-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderLabs(btn.dataset.labFilter);
    });
  });

  // Video filters
  document.querySelectorAll('[data-video-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-video-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const query = document.getElementById('video-search')?.value || '';
      renderVideos(btn.dataset.videoFilter, query);
    });
  });

  const videoSearch = document.getElementById('video-search');
  if (videoSearch) {
    videoSearch.addEventListener('input', () => {
      const active = document.querySelector('[data-video-filter].active');
      renderVideos(active?.dataset.videoFilter || 'all', videoSearch.value);
    });
  }

  // Leaderboard tabs
  document.querySelectorAll('[data-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderLeaderboard(tab.dataset.tab);
    });
  });
}

/* ============================================================
   GLOBAL SEARCH
   ============================================================ */
function setupGlobalSearch() {
  const toggle = document.getElementById('search-toggle');
  const bar = document.getElementById('search-bar');
  const input = document.getElementById('global-search');
  const results = document.getElementById('search-results');

  if (!toggle || !bar || !input || !results) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    bar.classList.toggle('visible', !expanded);
    bar.setAttribute('aria-hidden', String(expanded));
    if (!expanded) { input.focus(); }
    else { results.classList.remove('has-results'); results.innerHTML = ''; }
  });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.classList.remove('has-results'); results.innerHTML = ''; return; }

    const matches = SEARCH_INDEX.filter(item => item.label.toLowerCase().includes(q)).slice(0, 8);

    if (matches.length === 0) {
      results.classList.remove('has-results');
      return;
    }

    results.innerHTML = matches.map(m => `
      <div class="search-result-item" role="option" tabindex="0" onclick="navigateTo('${m.section}');bar.classList.remove('visible');input.value='';results.classList.remove('has-results');">
        <span class="search-result-tag">${m.type}</span>
        <span>${m.label}</span>
      </div>`).join('');
    results.classList.add('has-results');
  });

  document.addEventListener('click', (e) => {
    if (!bar.contains(e.target) && e.target !== toggle) {
      bar.classList.remove('visible');
      toggle.setAttribute('aria-expanded', 'false');
      results.classList.remove('has-results');
    }
  });
}

/* ============================================================
   NAVIGATION: NAV LINKS & HAMBURGER
   ============================================================ */
function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      if (section) navigateTo(section);
    });
  });

  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (ham && nav) {
    ham.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      ham.classList.toggle('active', isOpen);
      ham.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // CTA buttons
  const ctaReg = document.getElementById('cta-register');
  const loginBtn = document.getElementById('login-btn');
  const regBtn = document.getElementById('register-btn');

  if (ctaReg) ctaReg.addEventListener('click', () => openAuthModal('register'));
  if (loginBtn) loginBtn.addEventListener('click', () => openAuthModal('login'));
  if (regBtn) regBtn.addEventListener('click', () => openAuthModal('register'));

  // Handle hash
  const hash = location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    navigateTo(hash);
  } else {
    renderFeaturedCourses();
    document.getElementById('home').hidden = false;
    document.getElementById('home').classList.add('active');
  }
}

/* ============================================================
   AUTH MODAL
   ============================================================ */
function openAuthModal(tab = 'login') {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.hidden = false;

  const loginPanel = document.getElementById('modal-login');
  const registerPanel = document.getElementById('modal-register');
  const loginTab = document.getElementById('tab-login');
  const registerTab = document.getElementById('tab-register');

  if (tab === 'register') {
    loginPanel.hidden = true;
    registerPanel.hidden = false;
    loginTab.classList.remove('active');
    registerTab.classList.add('active');
    loginTab.setAttribute('aria-selected', 'false');
    registerTab.setAttribute('aria-selected', 'true');
  } else {
    loginPanel.hidden = false;
    registerPanel.hidden = true;
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginTab.setAttribute('aria-selected', 'true');
    registerTab.setAttribute('aria-selected', 'false');
  }

  // Focus first input
  setTimeout(() => {
    const first = modal.querySelector('input:not([type=hidden])');
    if (first) first.focus();
  }, 100);
}

function setupAuthModal() {
  const modal = document.getElementById('auth-modal');
  const closeBtn = document.getElementById('modal-close');
  const loginTab = document.getElementById('tab-login');
  const registerTab = document.getElementById('tab-register');
  const loginSubmit = document.getElementById('login-submit');
  const registerSubmit = document.getElementById('register-submit');

  if (!modal) return;

  // Close
  if (closeBtn) closeBtn.addEventListener('click', () => { modal.hidden = true; });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });

  // Tabs
  if (loginTab) loginTab.addEventListener('click', () => openAuthModal('login'));
  if (registerTab) registerTab.addEventListener('click', () => openAuthModal('register'));

  // Login
  if (loginSubmit) loginSubmit.addEventListener('click', () => {
    const email = document.getElementById('login-email')?.value;
    const pw = document.getElementById('login-password')?.value;
    if (!email || !pw) { showToast('Please fill in all fields', 'error'); return; }
    if (!email.includes('@')) { showToast('Please enter a valid email', 'error'); return; }
    showToast('✅ Logged in successfully! Welcome back.', 'success');
    modal.hidden = true;
  });

  // Register
  if (registerSubmit) registerSubmit.addEventListener('click', () => {
    const email = document.getElementById('reg-email')?.value;
    const username = document.getElementById('reg-username')?.value;
    const pw = document.getElementById('reg-password')?.value;
    const agree = document.getElementById('reg-agree')?.checked;
    if (!email || !username || !pw) { showToast('Please fill in all required fields', 'error'); return; }
    if (!agree) { showToast('Please agree to the Terms of Service and Ethics Policy', 'error'); return; }
    if (pw.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
    showToast('🎉 Account created! Welcome to CyberStart Academy.', 'success');
    modal.hidden = true;
  });

  // Password strength
  const pwInput = document.getElementById('reg-password');
  const strengthEl = document.getElementById('pw-strength');
  if (pwInput && strengthEl) {
    pwInput.addEventListener('input', () => {
      const v = pwInput.value;
      const form = pwInput.closest('.modal-form-panel');
      form?.classList.remove('pw-weak', 'pw-medium', 'pw-strong');
      if (v.length === 0) return;
      if (v.length < 6) { form?.classList.add('pw-weak'); strengthEl.textContent = 'Weak'; }
      else if (v.length < 10 || !/[^a-zA-Z0-9]/.test(v)) { form?.classList.add('pw-medium'); strengthEl.textContent = 'Medium'; }
      else { form?.classList.add('pw-strong'); strengthEl.textContent = 'Strong'; }
    });
  }

  // Keyboard trap
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.hidden = true;
    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

/* ============================================================
   TOOL MODAL
   ============================================================ */
function setupToolModal() {
  const modal = document.getElementById('tool-modal');
  const closeBtn = document.getElementById('tool-modal-close');
  if (!modal || !closeBtn) return;
  closeBtn.addEventListener('click', () => { modal.hidden = true; });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });
  modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.hidden = true; });
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function setupContact() {
  const submitBtn = document.getElementById('contact-submit');
  const feedback = document.getElementById('form-feedback');
  if (!submitBtn || !feedback) return;

  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const msg = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !msg) {
      feedback.className = 'form-feedback error';
      feedback.textContent = '⚠ Please fill in your name, email, and message.';
      return;
    }
    if (!email.includes('@')) {
      feedback.className = 'form-feedback error';
      feedback.textContent = '⚠ Please enter a valid email address.';
      return;
    }

    feedback.className = 'form-feedback success';
    feedback.textContent = '✅ Message sent! We\'ll get back to you within 48 hours.';
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-message').value = '';
    setTimeout(() => { feedback.className = 'form-feedback'; }, 5000);
  });
}

/* ============================================================
   TOAST
   ============================================================ */
let toastTimer = null;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 4000);
}
window.showToast = showToast;

/* ============================================================
   HEADER SCROLL
   ============================================================ */
function setupScrollBehavior() {
  const header = document.getElementById('site-header');
  if (!header) return;
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 20);
    last = y;
  }, { passive: true });
}

/* ============================================================
   SCANLINE EFFECT
   ============================================================ */
function addScanline() {
  const el = document.createElement('div');
  el.className = 'scanline';
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);
}

/* ============================================================
   KEYBOARD NAVIGATION
   ============================================================ */
function setupKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close any open modal
      document.querySelectorAll('.modal-overlay:not([hidden])').forEach(m => { m.hidden = true; });
    }
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';

  runLoader();
  setupNavigation();
  setupFilters();
  setupGlobalSearch();
  setupAuthModal();
  setupToolModal();
  setupContact();
  setupQuizNavigation();
  setupScrollBehavior();
  setupKeyboardNav();
  addScanline();

  // Initial renders
  renderFeaturedCourses();
});