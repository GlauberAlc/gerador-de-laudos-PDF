       document.addEventListener('DOMContentLoaded', function () {
            // --- DOM Elements ---
            const form = document.getElementById('certificate-form');
            const previewWrapper = document.getElementById('preview-wrapper');
            const previewScaler = document.getElementById('preview-scaler');
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');

            const formInputs = {
                companyLogo: document.getElementById('company-logo'),
                certificateTitle: document.getElementById('certificate-title'),
                certificateLine1: document.getElementById('certificate-line1'),
                certificateLine2: document.getElementById('certificate-line2'),
                certificateLine3: document.getElementById('certificate-line3'),
                recipientName: document.getElementById('recipient-name'),
                recipientCpf: document.getElementById('recipient-cpf'),
                instructorName: document.getElementById('instructor-name'),
                instructorCredentials: document.getElementById('instructor-credentials'),
                instructorSignature: document.getElementById('instructor-signature'),
                courseLoad: document.getElementById('course-load'),
                completionDate: document.getElementById('completion-date'),
                courseContent: document.getElementById('course-content'),
            };

            const previewElements = {
                logo: document.getElementById('preview-logo'),
                title: document.getElementById('preview-title'),
                line1: document.getElementById('preview-line1'),
                line2: document.getElementById('preview-line2'),
                line3: document.getElementById('preview-line3'),
                recipientName: document.getElementById('preview-recipient-name'),
                recipientNameFooter: document.getElementById('preview-recipient-name-footer'),
                recipientCpf: document.getElementById('preview-recipient-cpf'),
                instructorName: document.getElementById('preview-instructor-name'),
                instructorCredentials: document.getElementById('preview-instructor-credentials'),
                instructorSignatureImg: document.getElementById('preview-instructor-signature-img'),
                instructorSignatureText: document.getElementById('preview-instructor-signature-text'),
                courseContent: document.getElementById('preview-course-content'),
            };

            // --- Lógica da Paginação ---
            const page1 = document.getElementById('page-1');
            const page2 = document.getElementById('page-2');
            const showPage1Btn = document.getElementById('show-page-1-btn');
            const showPage2Btn = document.getElementById('show-page-2-btn');

            function updatePaginationButtons(activeBtn) {
                [showPage1Btn, showPage2Btn].forEach(btn => {
                    btn.classList.remove('active', 'bg-indigo-600', 'text-white');
                    btn.classList.add('bg-slate-200', 'text-slate-700', 'py-2', 'px-4', 'text-sm', 'font-semibold');
                });
                activeBtn.classList.add('active', 'bg-indigo-600', 'text-white');
                activeBtn.classList.remove('bg-slate-200', 'text-slate-700');
                if(activeBtn === showPage1Btn) {
                  activeBtn.classList.add('rounded-l-md');
                  showPage2Btn.classList.add('rounded-r-md');
                } else {
                  activeBtn.classList.add('rounded-r-md');
                  showPage1Btn.classList.add('rounded-l-md');
                }
            }
            
            showPage1Btn.addEventListener('click', () => {
                page1.classList.remove('hidden');
                page2.classList.add('hidden');
                updatePaginationButtons(showPage1Btn);
                scalePreview();
            });

            showPage2Btn.addEventListener('click', () => {
                page2.classList.remove('hidden');
                page1.classList.add('hidden');
                updatePaginationButtons(showPage2Btn);
                scalePreview();
            });
            
            // --- Main Function to Update Preview ---
            function updatePreview() {
                const recipientName = formInputs.recipientName.value || 'NOME DO ALUNO';
                const instructorName = formInputs.instructorName.value || 'Nome do Instrutor';
                const courseLoad = formInputs.courseLoad.value || 'XX';
                const completionDate = formatDate(formInputs.completionDate.value);

                const replaceTags = (text) => text.replace(/<NOME_INSTRUTOR>/g, instructorName).replace(/<CARGA_HORARIA>/g, courseLoad).replace(/<DATA_CONCLUSAO>/g, completionDate).replace(/<NOME_EMPRESA_CLIENTE>/g, 'EMPRESA MODELO EXEMPLO').replace(/<CNPJ_CLIENTE>/g, '00.000.000/0001-00').replace(/<NORMA_REGULAMENTADORA>/g, 'NR 18 - Condições e Meio Ambiente de Trabalho');

                previewElements.title.textContent = formInputs.certificateTitle.value;
                previewElements.line1.textContent = formInputs.certificateLine1.value;
                previewElements.recipientName.textContent = recipientName.toUpperCase();
                
                // CORREÇÃO: Corrigido o erro de digitação de 'certificate2' para 'certificateLine2' e 'certificate3' para 'certificateLine3'
                previewElements.line2.textContent = replaceTags(formInputs.certificateLine2.value);
                previewElements.line3.textContent = replaceTags(formInputs.certificateLine3.value);

                previewElements.recipientNameFooter.textContent = `Nome: ${recipientName}`;
                previewElements.recipientCpf.textContent = `CPF: ${formInputs.recipientCpf.value}`;
                previewElements.instructorName.textContent = instructorName;
                previewElements.instructorSignatureText.textContent = instructorName;
                previewElements.instructorCredentials.textContent = formInputs.instructorCredentials.value;
                previewElements.courseContent.textContent = formInputs.courseContent.value;
            }

            // --- Helper Functions ---
            function formatDate(dateValue) {
                if (!dateValue) return 'DD de Mês de AAAA';
                const date = new Date(dateValue + 'T00:00:00');
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return date.toLocaleDateString('pt-BR', options);
            }

            function handleImageUpload(event, imgElement, textElement) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        imgElement.src = e.target.result;
                        imgElement.classList.remove('hidden');
                        if (textElement) textElement.classList.add('hidden');
                    };
                    reader.readAsDataURL(file);
                }
            }

            // --- UI Logic: Tabs, Scaling, Icons ---
            function setupTabs() {
                tabButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        tabButtons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                        
                        tabContents.forEach(content => content.classList.remove('active'));
                        document.getElementById(button.dataset.tab).classList.add('active');
                    });
                });
            }

            function scalePreview() {
                const containerWidth = previewWrapper.clientWidth - 100; // um pouco de padding
                const certificateWidth = 1123; // Largura fixa do .certificate-page
                if (containerWidth > 0 && certificateWidth > 0) {
                    const scale = containerWidth / certificateWidth;
                    previewScaler.style.transform = `scale(${scale})`;
                }
            }
            
            // --- Event Listeners ---
            form.addEventListener('input', updatePreview);
            formInputs.companyLogo.addEventListener('change', (e) => handleImageUpload(e, previewElements.logo));
            formInputs.instructorSignature.addEventListener('change', (e) => handleImageUpload(e, previewElements.instructorSignatureImg, previewElements.instructorSignatureText));
            new ResizeObserver(scalePreview).observe(previewWrapper);

            // --- PDF Generation ---
            const generatePdfBtn = document.getElementById('generate-pdf-btn');
            const loadingModal = document.getElementById('loading-modal');

            // CORREÇÃO: Revertido para a lógica de geração de PDF do 'index.html' original, que é mais estável.
            generatePdfBtn.addEventListener('click', () => {
                loadingModal.classList.remove('hidden');
                
                const originalTransform = previewScaler.style.transform;
                previewScaler.style.transform = 'scale(1)'; // Reset scale for high-quality capture

                // Adiciona um pequeno delay para garantir que o DOM renderize a nova escala
                setTimeout(() => {
                    const page1 = document.getElementById('page-1');
                    const page2 = document.getElementById('page-2');
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
                    const captureOptions = { scale: 3, useCORS: true, logging: false, backgroundColor: '#ffffff' };

                    html2canvas(page1, captureOptions)
                        .then(canvas1 => {
                            pdf.addImage(canvas1.toDataURL('image/png'), 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
                            // Mostra a página 2 temporariamente para captura
                            page2.classList.remove('hidden');
                            return html2canvas(page2, captureOptions);
                        })
                        .then(canvas2 => {
                            pdf.addPage();
                            pdf.addImage(canvas2.toDataURL('image/png'), 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
                        })
                        .then(() => {
                            // Esconde a página 2 novamente
                            if (!showPage2Btn.classList.contains('active')) {
                                page2.classList.add('hidden');
                            }
                            previewScaler.style.transform = originalTransform; // Restore scale
                            pdf.save(`Certificado-${formInputs.recipientName.value.replace(/\s+/g, '_')}.pdf`);
                            loadingModal.classList.add('hidden');
                        })
                        .catch(err => {
                             if (!showPage2Btn.classList.contains('active')) {
                                page2.classList.add('hidden');
                            }
                            previewScaler.style.transform = originalTransform; // Restore scale on error
                            console.error("Error generating PDF:", err);
                            loadingModal.classList.add('hidden');
                        });
                }, 100); // 100ms delay
            });

            // --- Initial Setup ---
            formInputs.completionDate.value = new Date().toISOString().split('T')[0];
            feather.replace(); // Initialize icons
            setupTabs();
            updatePreview();
            setTimeout(scalePreview, 100);
            updatePaginationButtons(showPage1Btn); // Set initial state for pagination buttons
        });