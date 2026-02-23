 function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            sidebar.classList.toggle('open');
            mainContent.classList.toggle('shift');
        }

        // Auto-fill Registration Date
    document.addEventListener('DOMContentLoaded', () => {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('regDate').value = today;
        generatePatientId();
        loadSavedData();
      });
  
      // Generate Patient ID: HOSP-YYMMDD-XXX
      function generatePatientId() {
        const date = new Date();
        const yy = date.getFullYear().toString().slice(-2);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const prefix = `HOSP-${yy}${mm}${dd}`;
  
        // Get today's sequence from localStorage
        let records = JSON.parse(localStorage.getItem('patients') || '[]');
        let todayRecords = records.filter(r => r.patientId.startsWith(prefix));
        const seq = String(todayRecords.length + 1).padStart(3, '0');
  
        const patientId = `${prefix}-${seq}`;
        document.getElementById('patientId').textContent = patientId;
        return patientId;
      }
  
      // Photo Preview
      document.getElementById('photo').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('photoPreview');
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Patient Photo">`;
          };
          reader.readAsDataURL(file);
        } else {
          preview.innerHTML = '<div class="placeholder">No photo</div>';
        }
      });
  
      // Save to localStorage
      document.getElementById('patientForm').addEventListener('submit', function(e) {
        e.preventDefault();
  
        const formData = new FormData(this);
        const photoFile = document.getElementById('photo').files[0];
  
        const patient = {
          patientId: document.getElementById('patientId').textContent,
          regDate: formData.get('regDate'),
          firstName: formData.get('firstName'),
          middleName: formData.get('middleName'),
          lastName: formData.get('lastName'),
          dob: formData.get('dob'),
          gender: document.querySelector('input[name="gender"]:checked')?.value || '',
          bloodGroup: formData.get('bloodGroup'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          addressLine1: formData.get('addressLine1'),
          addressLine2: formData.get('addressLine2'),
          city: formData.get('city'),
          state: formData.get('state'),
          pincode: formData.get('pincode'),
          country: formData.get('country'),
          relativeName: formData.get('relativeName'),
          relation: formData.get('relation'),
          relativePhone: formData.get('relativePhone'),
          relativeAddress: formData.get('relativeAddress'),
          photo: photoFile ? URL.createObjectURL(photoFile) : null,
          timestamp: new Date().toISOString()
        };
  
        // Save to localStorage
        let patients = JSON.parse(localStorage.getItem('patients') || '[]');
        patients.push(patient);
        localStorage.setItem('patients', JSON.stringify(patients));
  
        alert(`Patient registered successfully!\nID: ${patient.patientId}`);
        
        // Optional: Reset form
        // this.reset();
        // generatePatientId();
      });
  
      // Load saved data (for demo)
      function loadSavedData() {
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        if (patients.length > 0) {
          console.log('Registered Patients:', patients);
        }
      }

      function showSidebar(){
      const sidebar = document.querySelector('.sidebar')
      sidebar.style.display = 'flex'
    }
    function hideSidebar(){
      const sidebar = document.querySelector('.sidebar')
      sidebar.style.display = 'none'
    }



  
    // Default admin credentials (for demo) - you can change or remove
    const DEFAULT_USER = { username: "admin", password: "admin123" };

    // Check if user is already logged in
    window.onload = function() {
      if (localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "dashboard.html"; // Redirect to your dashboard
      }

      // If no user exists, auto-register default
      if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(DEFAULT_USER));
        showAlert("Default account created: admin / admin123", "info");
      }
    };

    // Login Form Submit
    document.getElementById("loginForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", username);
        showAlert("Login successful! Redirecting...", "success");

        setTimeout(() => {
          window.location.href = "dashboard.html"; // Change to your dashboard file
        }, 1000);
      } else {
        showAlert("Invalid username or password!", "danger");
      }
    });

    // Register Link (for first-time setup)
    document.getElementById("registerLink").addEventListener("click", function(e) {
      e.preventDefault();
      const newUser = prompt("Enter new username:");
      const newPass = prompt("Enter new password:");

      if (newUser && newPass) {
        localStorage.setItem("user", JSON.stringify({ username: newUser, password: newPass }));
        showAlert(`Account created! Login with: ${newUser}`, "success");
      }
    });

    // Alert Helper
    function showAlert(message, type) {
      const alertDiv = document.createElement("div");
      alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
      alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      document.getElementById("alertContainer").innerHTML = "";
      document.getElementById("alertContainer").appendChild(alertDiv);

      // Auto hide after 5 seconds
      setTimeout(() => {
        alertDiv.classList.remove("show");
      }, 5000);
    }
 
