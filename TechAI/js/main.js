// Globale Variablen
let generatedContent = {};
let lastGeneratedContent = {};

// Diese Funktion MUSS hier am Anfang stehen!
function switchTab(tabId) {
    document.querySelectorAll('.tool-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tool-section').forEach(section => section.classList.remove('active'));
    
    const clickedTab = document.querySelector(`[onclick="switchTab('${tabId}')"]`);
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
    
    document.getElementById(tabId).classList.add('active');
}

function showLoading(loadingElementId) {
    document.getElementById(loadingElementId).style.display = 'block';
    document.querySelectorAll('.action-button').forEach(button => button.disabled = true);
}

function hideLoading(loadingElementId) {
    document.getElementById(loadingElementId).style.display = 'none';
    document.querySelectorAll('.action-button').forEach(button => button.disabled = false);
}

// Modal Funktionen
function showLeadModal(content) {
    generatedContent = content;
    document.getElementById('leadCaptureModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLeadModal() {
    document.getElementById('leadCaptureModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Make.com Webhook Konfiguration
const MAKE_WEBHOOKS = {
    leadScoring: 'https://hook.eu2.make.com/3imx9avl2lk9lr8yugjopzknv339977y',
    contentGenerated: 'https://hook.eu2.make.com/wag7z5sodbvagl3abaere4opian1lxii',
    emailOptimized: 'https://hook.eu1.make.com/YOUR_WEBHOOK_ID_3',
    socialContent: 'https://hook.eu1.make.com/YOUR_WEBHOOK_ID_4'
};

// KORRIGIERTE sendToMake Funktion
async function sendToMake(webhookUrl, data) {
    try {
        // Erstelle das finale Payload
        const payload = {
            timestamp: new Date().toISOString(),
            source: 'TechMarketing_AI',
            tool_version: '1.0',
            ...data  // Zuerst die übergebenen Daten
        };
        
        // Füge contact-Daten nur hinzu, wenn sie nicht bereits in data enthalten sind
        if (!payload.contact) {
            payload.contact = {
                email: getContactEmail(),
                name: getContactName(),
                company: getCompanyName()
            };
        }
        
        console.log('📤 Sende an Make.com:', payload);
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            showMakeSuccess();
            return await response.json();
        }
    } catch (error) {
        console.error('Make webhook error:', error);
    }
}

// Hilfsfunktionen für Kontaktdaten
function getContactEmail() {
    // Versuche Email aus verschiedenen Quellen zu holen
    const emailInput = document.getElementById('userEmail');
    const emailField = document.querySelector('input[type="email"]');
    const storedEmail = localStorage.getItem('userEmail');
    
    return emailInput?.value || 
           emailField?.value || 
           storedEmail || 
           'nicht_angegeben@techmarketing.ai';
}

function getContactName() {
    // Versuche Name aus verschiedenen Quellen zu holen
    const nameInput = document.getElementById('userName');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const storedName = localStorage.getItem('userName');
    
    if (firstNameInput && lastNameInput) {
        return `${firstNameInput.value} ${lastNameInput.value}`.trim();
    }
    
    return nameInput?.value || 
           storedName || 
           'Unbekannter Nutzer';
}

function getCompanyName() {
    // Versuche Unternehmensname aus verschiedenen Quellen zu holen
    const companyInput = document.getElementById('companyName');
    const organizationInput = document.getElementById('organization');
    const storedCompany = localStorage.getItem('companyName');
    
    return companyInput?.value || 
           organizationInput?.value || 
           storedCompany || 
           'Unbekanntes Unternehmen';
}

// Funktion zum Speichern von Kontaktdaten (optional)
function saveContactData(email, name, company) {
    if (email) localStorage.setItem('userEmail', email);
    if (name) localStorage.setItem('userName', name);
    if (company) localStorage.setItem('companyName', company);
}

function showMakeSuccess() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: #6366f1; 
        color: white; padding: 15px 20px; border-radius: 8px; z-index: 1000;
        font-weight: 600; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    `;
    notification.textContent = '⚡ Make.com Scenario ausgelöst!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Content Generator - erweitert mit Kontaktdaten-Erfassung
function generateContent() {
    const productDesc = document.getElementById('productDescription').value.trim();
    const targetAudience = document.getElementById('targetAudience').value;
    const industry = document.getElementById('industry').value;
    const contentTone = document.getElementById('contentTone').value;
    const urgency = document.getElementById('urgency').value;
    const focusMetric = document.getElementById('focusMetric').value;
    const resultsDiv = document.getElementById('contentResults');
    
    if (!productDesc) {
        alert('Bitte geben Sie eine Produktbeschreibung ein!');
        return;
    }
    
    // Daten für später speichern
    lastGeneratedContent = {
        productDesc,
        targetAudience,
        industry,
        contentTone,
        urgency,
        focusMetric
    };
    
    // Webhook Aufruf
    sendToMake(MAKE_WEBHOOKS.contentGenerated, lastGeneratedContent);

    showLoading('contentLoading');
    resultsDiv.innerHTML = ''; 

    setTimeout(() => {
        const generatedText = `
            <div class="result-card">
                <h3 class="result-header">Marketing-Beschreibung</h3>
                <p class="result-content">
                    Revolutionäre Lösung für Ihre ${industry}-Industrie: ${productDesc}
                    Maßgeschneidert für ${targetAudience} mit ${contentTone} Tonalität und Fokus auf ${focusMetric}.
                    Unsere fortschrittliche Technologie bietet:
                    • Höchste Präzision und Zuverlässigkeit
                    • Nachgewiesene Effizienzsteigerung und Kosteneinsparungen
                    • Nahtlose Integration in bestehende Systeme
                    • Deutsche Premium-Qualität mit 24/7 Support
                    Handeln Sie jetzt, um Ihre ${focusMetric} zu maximieren! Fordern Sie noch heute eine kostenlose Beratung an!
                </p>
            </div>
        `;
        resultsDiv.innerHTML = generatedText;
        hideLoading('contentLoading');
        
        // Lead Modal nach 1 Sekunde zeigen
        setTimeout(() => {
            showLeadModal({ 
                description: generatedText,
                ...lastGeneratedContent 
            });
        }, 1000);
    }, 2000);
}

// FINALE Lead Form Submit Funktion
async function submitLeadForm(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet...';
    
    // Kontaktdaten aus dem Formular extrahieren
    const leadData = {
        name: document.getElementById('leadName').value,
        email: document.getElementById('leadEmail').value,
        company: document.getElementById('leadCompany').value
    };
    
    // WICHTIG: Kontaktdaten lokal speichern für andere Tools
    saveContactData(leadData.email, leadData.name, leadData.company);
    
    const formData = {
        // EXPLIZIT die contact-Daten setzen
        contact: {
            email: leadData.email,
            name: leadData.name,
            company: leadData.company
        },
        // Zusätzliche Daten
        generated_content: generatedContent,
        content_data: lastGeneratedContent,
        timestamp: new Date().toISOString(),
        source: 'content_generator_lead_capture',
        tool_used: 'content_generator',
        request_type: 'lead_capture_with_content',
        // Auch direkt auf Root-Level für Kompatibilität
        name: leadData.name,
        email: leadData.email,
        company: leadData.company
    };
    
    console.log('📋 Lead Form Daten:', formData);
    
    try {
        // Verwende sendToMake mit den expliziten Daten
        await sendToMake(MAKE_WEBHOOKS.contentGenerated, formData);
        
        // Erfolgsmeldung anzeigen
        successMessage.classList.add('show');
        document.querySelector('.lead-form').style.display = 'none';
        
        setTimeout(() => {
            closeLeadModal();
            document.querySelector('.lead-form').reset();
            document.querySelector('.lead-form').style.display = 'flex';
            successMessage.classList.remove('show');
        }, 3000);
        
    } catch (error) {
        console.error('Lead capture error:', error);
        alert('Fehler beim Senden. Bitte versuchen Sie es erneut.');
    }
    
    submitBtn.disabled = false;
    submitBtn.textContent = '📧 Content per E-Mail erhalten';
}

// Lead Scoring
function calculateLeadScore() {
    const companyEmail = document.getElementById('companyName').value.trim();
    const companySize = document.getElementById('companySize').value;
    const websiteVisits = document.getElementById('websiteVisits').value;
    const emailEngagement = document.getElementById('emailEngagement').value;
    const resultsDiv = document.getElementById('scoringResults');

    if (!companyEmail) {
        alert('Bitte geben Sie einen Unternehmens-E-Mail ein!');
        return;
    }

    let score = 0;
    if (companySize === 'large') score += 30;
    else if (companySize === 'medium') score += 20;
    else if (companySize === 'small') score += 10;
    else if (companySize === 'startup') score += 5;

    if (websiteVisits === '10+') score += 40;
    else if (websiteVisits === '4-10') score += 25;
    else if (websiteVisits === '1-3') score += 10;

    if (emailEngagement === 'high') score += 30;
    else if (emailEngagement === 'medium') score += 15;
    else if (emailEngagement === 'low') score += 5;

    let priority = '';
    let scoreDescription = '';
    if (score >= 80) {
        priority = 'HOT';
        scoreDescription = 'Sehr hohes Potenzial (Hot Lead)';
    } else if (score >= 50) {
        priority = 'WARM';
        scoreDescription = 'Hohes Potenzial (Warm Lead)';
    } else {
        priority = 'COLD';
        scoreDescription = 'Mäßiges Potenzial (Cold Lead)';
    }

    const company = companyEmail.includes('@') ? companyEmail.split('@')[1].split('.')[0] : companyEmail;

    sendToMake(MAKE_WEBHOOKS.leadScoring, { 
        email: companyEmail,
        company: company,
        score: score,
        priority: priority,
        scoreDescription: scoreDescription,
        companySize, 
        websiteVisits, 
        emailEngagement 
    });
    
    showLoading('scoringLoading');
    resultsDiv.innerHTML = '';

    setTimeout(() => {
        const result = `
            <div class="score-display">
                <div class="score-number">${score}</div>
                <div class="score-label">Lead Score</div>
            </div>
            <div class="result-card">
                <h3 class="result-header">Empfehlung</h3>
                <p class="result-content">Basierend auf den Eingaben ist der Lead für "${companyEmail}" ein ${scoreDescription}.</p>
            </div>
        `;
        resultsDiv.innerHTML = result;
        hideLoading('scoringLoading');
    }, 2000);
}

function optimizeEmail() {
    const emailProduct = document.getElementById('emailProduct').value.trim();
    const recipientRole = document.getElementById('recipientRole').value;
    const customerStage = document.getElementById('customerStage').value;
    const urgencyLevel = document.getElementById('urgencyLevel').value;
    const resultsDiv = document.getElementById('emailResults');

    if (!emailProduct) {
        alert('Bitte geben Sie ein Produkt/Service für die E-Mail ein!');
        return;
    }

    sendToMake(MAKE_WEBHOOKS.emailOptimized, { emailProduct, recipientRole, customerStage, urgencyLevel });

    showLoading('emailLoading');
    resultsDiv.innerHTML = '';

    setTimeout(() => {
        let subjectLine = '';
        let emailBody = '';

        switch (customerStage) {
            case 'cold':
                subjectLine = `Entdecken Sie, wie ${emailProduct} Ihr Geschäft transformiert!`;
                emailBody = `Sehr geehrte/r Entscheidungsträger/in,\n\nwir möchten Ihnen ${emailProduct} vorstellen – eine Lösung, die neue Möglichkeiten schafft...`;
                break;
            case 'warm':
                subjectLine = `Neue Einblicke zu ${emailProduct} – speziell für Sie!`;
                emailBody = `Sehr geehrte/r ${recipientRole}-Entscheider/in,\n\nwir freuen uns über Ihr Interesse an ${emailProduct}...`;
                break;
            case 'hot':
                subjectLine = `Letzter Schritt zur Einführung von ${emailProduct}`;
                emailBody = `Sehr geehrte/r ${recipientRole},\n\nSie stehen kurz vor einer bahnbrechenden Entscheidung – ${emailProduct} ist bereit für den nächsten Schritt...`;
                break;
            case 'customer':
                subjectLine = `Exklusive Optimierungsmöglichkeiten für Ihr bestehendes ${emailProduct}`;
                emailBody = `Liebe/r Kunde/in,\n\nvielen Dank für Ihre bisherige Zusammenarbeit. Mit ${emailProduct} bieten wir Ihnen neue Features & Vorteile...`;
                break;
        }

        const result = `
            <div class="result-card">
                <h3 class="result-header">Optimierter E-Mail Betreff</h3>
                <p class="result-content">${subjectLine}</p>
            </div>
            <div class="result-card">
                <h3 class="result-header">Optimierter E-Mail Inhalt</h3>
                <p class="result-content">${emailBody}</p>
            </div>
        `;
        resultsDiv.innerHTML = result;
        hideLoading('emailLoading');
    }, 2000);
}

function generateSocialContent() {
    const socialContent = document.getElementById('socialContentInput').value.trim();
    const socialGoal = document.getElementById('socialGoal').value;
    const resultsDiv = document.getElementById('socialResults');

    if (!socialContent) {
        alert('Bitte geben Sie einen Basis-Content ein!');
        return;
    }

    sendToMake(MAKE_WEBHOOKS.socialContent, { socialContent, socialGoal });

    showLoading('socialLoading');
    resultsDiv.innerHTML = '';

    setTimeout(() => {
        const resultHTML = `
            <div class="platform-content">
                <div class="platform-header"><span class="platform-icon linkedin"></span> LinkedIn</div>
                <p>${socialContent} 🚀\n\n#Innovation #B2B #${socialGoal}</p>
            </div>
            <div class="platform-content">
                <div class="platform-header"><span class="platform-icon twitter"></span> Twitter / X</div>
                <p>${socialContent.substring(0, 200)}... #${socialGoal}</p>
            </div>
            <div class="platform-content">
                <div class="platform-header"><span class="platform-icon facebook"></span> Facebook</div>
                <p>${socialContent}\n👉 Jetzt mehr erfahren!\n#${socialGoal}</p>
            </div>
        `;
        resultsDiv.innerHTML = resultHTML;
        hideLoading('socialLoading');
    }, 2000);
}

// Custom Select Implementation
function initCustomSelects() {
    document.querySelectorAll('select.input-field').forEach(function(selectElement) {
        // Skip if already converted
        if (selectElement.classList.contains('customized')) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';
        
        selectElement.parentNode.insertBefore(wrapper, selectElement);
        wrapper.appendChild(selectElement);
        selectElement.classList.add('customized');
        selectElement.style.display = 'none';

        const customSelect = document.createElement('div');
        customSelect.className = 'custom-select';
        wrapper.appendChild(customSelect);

        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        trigger.textContent = selectElement.options[selectElement.selectedIndex].textContent;
        customSelect.appendChild(trigger);

        const options = document.createElement('div');
        options.className = 'custom-options';
        
        Array.from(selectElement.options).forEach(function(optionElement, index) {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.textContent = optionElement.textContent;
            customOption.dataset.value = optionElement.value;

            if (selectElement.selectedIndex === index) {
                customOption.classList.add('selected');
            }

            // Click handler für jede Option
            customOption.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Update original select
                selectElement.value = this.dataset.value;
                
                // Update trigger text
                trigger.textContent = this.textContent;
                
                // Update selected state
                customSelect.querySelectorAll('.custom-option').forEach(opt => 
                    opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Close dropdown
                customSelect.classList.remove('open');
                
                // Trigger change event on original select
                try {
                    if (typeof Event === 'function') {
                        selectElement.dispatchEvent(new Event('change', {
                            bubbles: true,
                            cancelable: true
                        }));
                    } else {
                        const event = document.createEvent('HTMLEvents');
                        event.initEvent('change', true, true);
                        selectElement.dispatchEvent(event);
                    }
                } catch (error) {
                    console.error('Event dispatch error:', error);
                }
            });

            options.appendChild(customOption);
        });
        
        customSelect.appendChild(options);

        // Improved toggle handler
        trigger.addEventListener('mousedown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const wasOpen = customSelect.classList.contains('open');
            
            // Close all other selects
            document.querySelectorAll('.custom-select').forEach(s => 
                s.classList.remove('open'));
            
            // Toggle this one if it wasn't open
            if (!wasOpen) {
                customSelect.classList.add('open');
            }
        });
    });
}

// DOM Content Loaded Event Handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize custom selects
    initCustomSelects();

    // Close selects when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-select')) {
            document.querySelectorAll('.custom-select.open').forEach(select => 
                select.classList.remove('open'));
        }
    });

    // Modal event listeners
    const leadCaptureModal = document.getElementById('leadCaptureModal');
    if (leadCaptureModal) {
        leadCaptureModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLeadModal();
            }
        });
    }

    // Keyboard event listeners
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLeadModal();
            document.querySelectorAll('.custom-select.open').forEach(select => 
                select.classList.remove('open'));
        }
    });
});
