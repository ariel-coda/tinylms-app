'use client'
import React, { useState } from "react";
import { FileText, Plus, Download, QrCode } from "lucide-react";

interface FormField {
  id: number;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
}

interface FormConfig {
  title: string;
  description: string;
  logo: string | null;
  backgroundColor: string;
  backgroundImage: string | null;
  formWidth: string;
  fieldBorderColor: string;
  fieldBorderRadius: string;
  fieldPadding: string;
  labelFontSize: string;
  inputFontSize: string;
  labelColor: string;
  buttonText: string;
  buttonColor: string;
  buttonTextColor: string;
  footerText: string;
  showFooter: boolean;
}

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<"personnalisation" | "reponses" | "publication">("personnalisation");
  const [leftMenuSection, setLeftMenuSection] = useState("general");
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);
  const [formConfig, setFormConfig] = useState<FormConfig>({
    title: "Mon Formulaire",
    description: "Description du formulaire",
    logo: null,
    backgroundColor: "#ffffff",
    backgroundImage: null,
    formWidth: "600",
    fieldBorderColor: "#d1d5db",
    fieldBorderRadius: "6",
    fieldPadding: "12",
    labelFontSize: "14",
    inputFontSize: "14",
    labelColor: "#374151",
    buttonText: "Envoyer",
    buttonColor: "#1f2937",
    buttonTextColor: "#ffffff",
    footerText: "Merci de votre participation",
    showFooter: true,
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormConfig({ ...formConfig, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormConfig({ ...formConfig, backgroundImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (e: React.DragEvent, fieldType: { type: string; label: string; icon: string }) => {
    e.dataTransfer.setData("fieldType", JSON.stringify(fieldType));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fieldType = JSON.parse(e.dataTransfer.getData("fieldType"));
    const newField: FormField = {
      id: Date.now(),
      type: fieldType.type,
      label: fieldType.label,
      placeholder: "",
      required: false,
    };
    setFormFields([...formFields, newField]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const deleteField = (id: number) => {
    setFormFields(formFields.filter(field => field.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const updateFieldLabel = (id: number, newLabel: string) => {
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, label: newLabel } : field
    ));
  };

  const formElements = [
    { type: "text", label: "Texte court", icon: "T" },
    { type: "textarea", label: "Texte long", icon: "¶" },
    { type: "email", label: "Email", icon: "@" },
    { type: "tel", label: "Téléphone", icon: "☎" },
    { type: "number", label: "Nombre", icon: "#" },
    { type: "date", label: "Date", icon: "📅" },
    { type: "select", label: "Liste déroulante", icon: "▼" },
    { type: "radio", label: "Choix unique", icon: "◉" },
    { type: "checkbox", label: "Cases à cocher", icon: "☑" },
    { type: "file", label: "Fichier", icon: "📎" },
  ];

  const colorPresets = [
    "#ffffff", "#f3f4f6", "#e5e7eb", "#d1d5db", "#9ca3af",
    "#000000", "#1f2937", "#374151", "#4b5563", "#6b7280",
    "#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6",
    "#ec4899", "#14b8a6", "#f97316", "#84cc16", "#06b6d4",
  ];

  const mockResponses = [
    { id: 1, nom: "Jean Dupont", email: "jean@email.com", date: "15/10/2024" },
    { id: 2, nom: "Marie Martin", email: "marie@email.com", date: "14/10/2024" },
    { id: 3, nom: "Pierre Durand", email: "pierre@email.com", date: "13/10/2024" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      
      {/* Header large */}
      <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img src="./tinydock.svg" alt="TinyDock" className="h-8" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Formulaires</p>
              <p className="text-xs text-gray-500">Module actif</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="./user-circles.png" alt="Profil" className="w-9 h-9 rounded-full" />
            <div>
              <p className="text-sm font-medium text-gray-900">Jean Dupont</p>
              <p className="text-xs text-gray-500">jean.dupont@email.com</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar extrême gauche - Modules */}
        <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 gap-3">
          <button className="w-14 h-14 rounded-lg bg-gray-900 flex items-center justify-center">
            <FileText className="w-7 h-7 text-white" />
          </button>
          
          <div className="w-10 h-px bg-gray-200 my-2"></div>
          
          <button className="w-14 h-14 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
            <Plus className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Menu gauche - Navigation des vues */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900">Menu</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <button
              onClick={() => setCurrentView("personnalisation")}
              className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                currentView === "personnalisation" ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Personnalisation
            </button>
            <button
              onClick={() => setCurrentView("reponses")}
              className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                currentView === "reponses" ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Réponses
            </button>
            <button
              onClick={() => setCurrentView("publication")}
              className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                currentView === "publication" ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Publication
            </button>
          </div>
        </div>

        {/* Vue Personnalisation */}
        {currentView === "personnalisation" && (
          <>
            {/* Sous-menu personnalisation */}
            <div className="w-56 bg-white border-r border-gray-200 overflow-y-auto p-2">
              <button
                onClick={() => setLeftMenuSection("general")}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  leftMenuSection === "general" ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Général
              </button>
              <button
                onClick={() => setLeftMenuSection("champs")}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  leftMenuSection === "champs" ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Champs
              </button>
              <button
                onClick={() => setLeftMenuSection("bordures")}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  leftMenuSection === "bordures" ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Bordures
              </button>
              <button
                onClick={() => setLeftMenuSection("textes")}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  leftMenuSection === "textes" ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Textes
              </button>
              <button
                onClick={() => setLeftMenuSection("couleurs")}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  leftMenuSection === "couleurs" ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Couleurs
              </button>
              <button
                onClick={() => setLeftMenuSection("fond")}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  leftMenuSection === "fond" ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Fond
              </button>
              <button
                onClick={() => setLeftMenuSection("dimensions")}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  leftMenuSection === "dimensions" ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Dimensions
              </button>
              <button
                onClick={() => setLeftMenuSection("bouton")}
                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                  leftMenuSection === "bouton" ? "bg-gray-100 font-medium text-gray-900" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Bouton
              </button>
            </div>

            {/* Panneau de configuration */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
              <div className="h-12 px-4 flex items-center border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Options</h3>
              </div>

              <div className="p-4 space-y-4">
                
                {leftMenuSection === "general" && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Logo du formulaire</label>
                      <label className="w-full border-2 border-dashed border-gray-300 rounded-lg py-8 text-sm text-gray-500 hover:border-gray-400 transition-colors flex flex-col items-center justify-center cursor-pointer">
                        {formConfig.logo ? (
                          <img src={formConfig.logo} alt="Logo" className="h-12 mb-2" />
                        ) : (
                          <>
                            <Plus className="w-6 h-6 mb-2 text-gray-400" />
                            <span>Ajouter un logo</span>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      </label>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Titre du formulaire</label>
                      <input
                        type="text"
                        value={formConfig.title}
                        onChange={(e) => setFormConfig({...formConfig, title: e.target.value})}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Description</label>
                      <textarea
                        value={formConfig.description}
                        onChange={(e) => setFormConfig({...formConfig, description: e.target.value})}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Texte du footer</label>
                      <input
                        type="text"
                        value={formConfig.footerText}
                        onChange={(e) => setFormConfig({...formConfig, footerText: e.target.value})}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                      />
                    </div>
                  </>
                )}

                {leftMenuSection === "champs" && (
                  <>
                    <p className="text-xs text-gray-500 mb-3">Glissez pour ajouter</p>
                    {formElements.map((element, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, element)}
                        className="flex items-center gap-3 px-3 py-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 cursor-move transition-colors"
                      >
                        <span className="text-lg">{element.icon}</span>
                        <span className="font-medium text-gray-700">{element.label}</span>
                      </div>
                    ))}
                  </>
                )}

                {leftMenuSection === "bordures" && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-3">Couleur des bordures</label>
                      <div className="grid grid-cols-5 gap-2">
                        {colorPresets.map((color) => (
                          <button
                            key={color}
                            onClick={() => setFormConfig({...formConfig, fieldBorderColor: color})}
                            className={`w-10 h-10 rounded border-2 ${
                              formConfig.fieldBorderColor === color ? "border-gray-900" : "border-gray-200"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Arrondi (px)</label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={formConfig.fieldBorderRadius}
                        onChange={(e) => setFormConfig({...formConfig, fieldBorderRadius: e.target.value})}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{formConfig.fieldBorderRadius}px</span>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Espacement interne (px)</label>
                      <input
                        type="range"
                        min="8"
                        max="24"
                        value={formConfig.fieldPadding}
                        onChange={(e) => setFormConfig({...formConfig, fieldPadding: e.target.value})}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{formConfig.fieldPadding}px</span>
                    </div>
                  </>
                )}

                {leftMenuSection === "textes" && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Taille des labels (px)</label>
                      <input
                        type="range"
                        min="12"
                        max="20"
                        value={formConfig.labelFontSize}
                        onChange={(e) => setFormConfig({...formConfig, labelFontSize: e.target.value})}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{formConfig.labelFontSize}px</span>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Taille des champs (px)</label>
                      <input
                        type="range"
                        min="12"
                        max="18"
                        value={formConfig.inputFontSize}
                        onChange={(e) => setFormConfig({...formConfig, inputFontSize: e.target.value})}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{formConfig.inputFontSize}px</span>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-3">Couleur du texte</label>
                      <div className="grid grid-cols-5 gap-2">
                        {colorPresets.map((color) => (
                          <button
                            key={color}
                            onClick={() => setFormConfig({...formConfig, labelColor: color})}
                            className={`w-10 h-10 rounded border-2 ${
                              formConfig.labelColor === color ? "border-gray-900" : "border-gray-200"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {leftMenuSection === "couleurs" && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-3">Couleur de fond</label>
                      <div className="grid grid-cols-5 gap-2">
                        {colorPresets.map((color) => (
                          <button
                            key={color}
                            onClick={() => setFormConfig({...formConfig, backgroundColor: color})}
                            className={`w-10 h-10 rounded border-2 ${
                              formConfig.backgroundColor === color ? "border-gray-900" : "border-gray-200"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {leftMenuSection === "fond" && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Image de fond</label>
                      <label className="w-full border-2 border-dashed border-gray-300 rounded-lg py-8 text-sm text-gray-500 hover:border-gray-400 transition-colors flex flex-col items-center justify-center cursor-pointer">
                        {formConfig.backgroundImage ? (
                          <img src={formConfig.backgroundImage} alt="Fond" className="h-12 mb-2" />
                        ) : (
                          <>
                            <Plus className="w-6 h-6 mb-2 text-gray-400" />
                            <span>Ajouter une image</span>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleBackgroundUpload} className="hidden" />
                      </label>
                    </div>
                  </>
                )}

                {leftMenuSection === "dimensions" && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Largeur (px)</label>
                      <input
                        type="range"
                        min="400"
                        max="1000"
                        step="50"
                        value={formConfig.formWidth}
                        onChange={(e) => setFormConfig({...formConfig, formWidth: e.target.value})}
                        className="w-full"
                      />
                      <span className="text-xs text-gray-500">{formConfig.formWidth}px</span>
                    </div>
                  </>
                )}

                {leftMenuSection === "bouton" && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Texte du bouton</label>
                      <input
                        type="text"
                        value={formConfig.buttonText}
                        onChange={(e) => setFormConfig({...formConfig, buttonText: e.target.value})}
                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-3">Couleur du bouton</label>
                      <div className="grid grid-cols-5 gap-2">
                        {colorPresets.map((color) => (
                          <button
                            key={color}
                            onClick={() => setFormConfig({...formConfig, buttonColor: color})}
                            className={`w-10 h-10 rounded border-2 ${
                              formConfig.buttonColor === color ? "border-gray-900" : "border-gray-200"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-3">Couleur du texte</label>
                      <div className="grid grid-cols-5 gap-2">
                        {colorPresets.map((color) => (
                          <button
                            key={color}
                            onClick={() => setFormConfig({...formConfig, buttonTextColor: color})}
                            className={`w-10 h-10 rounded border-2 ${
                              formConfig.buttonTextColor === color ? "border-gray-900" : "border-gray-200"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Zone template */}
            <div className="flex-1 overflow-auto p-8">
              <div className="flex justify-center">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    width: `${formConfig.formWidth}px`,
                    backgroundColor: formConfig.backgroundColor,
                    backgroundImage: formConfig.backgroundImage ? `url(${formConfig.backgroundImage})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm p-8"
                >
                  {formConfig.logo ? (
                    <img src={formConfig.logo} alt="Logo" className="h-16 mb-6" />
                  ) : (
                    <div className="h-16 w-32 bg-gray-100 rounded mb-6 flex items-center justify-center text-xs text-gray-400">
                      Logo
                    </div>
                  )}

                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">{formConfig.title}</h1>
                  <p className="text-sm text-gray-600 mb-8">{formConfig.description}</p>

                  <div className="space-y-4 min-h-[300px]">
                    {formFields.length === 0 ? (
                      <div className="border-2 border-dashed border-gray-200 rounded-lg min-h-[300px] flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-3 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                            <span className="text-2xl text-gray-300">↓</span>
                          </div>
                          <p className="text-sm text-gray-500">Glissez des champs ici</p>
                        </div>
                      </div>
                    ) : (
                      formFields.map((field) => (
                        <div key={field.id} className="group relative" onClick={() => setSelectedFieldId(field.id)}>
                          {selectedFieldId === field.id ? (
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                              onBlur={() => setSelectedFieldId(null)}
                              autoFocus
                              className="block font-medium mb-2 border-b border-gray-300 px-1 py-1 text-sm"
                              style={{
                                fontSize: `${formConfig.labelFontSize}px`,
                                color: formConfig.labelColor,
                              }}
                            />
                          ) : (
                            <label
                              style={{
                                fontSize: `${formConfig.labelFontSize}px`,
                                color: formConfig.labelColor,
                              }}
                              className="block font-medium mb-2 cursor-pointer"
                            >
                              {field.label}
                            </label>
                          )}
                          
                          {field.type === "textarea" ? (
                            <textarea
                              style={{
                                borderColor: formConfig.fieldBorderColor,
                                borderRadius: `${formConfig.fieldBorderRadius}px`,
                                padding: `${formConfig.fieldPadding}px`,
                                fontSize: `${formConfig.inputFontSize}px`,
                              }}
                              className="w-full border"
                              rows={3}
                            />
                          ) : field.type === "select" ? (
                            <select
                              style={{
                                borderColor: formConfig.fieldBorderColor,
                                borderRadius: `${formConfig.fieldBorderRadius}px`,
                                padding: `${formConfig.fieldPadding}px`,
                                fontSize: `${formConfig.inputFontSize}px`,
                              }}
                              className="w-full border"
                            >
                              <option>Sélectionnez</option>
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              style={{
                                borderColor: formConfig.fieldBorderColor,
                                borderRadius: `${formConfig.fieldBorderRadius}px`,
                                padding: `${formConfig.fieldPadding}px`,
                                fontSize: `${formConfig.inputFontSize}px`,
                              }}
                              className="w-full border"
                            />
                          )}
                          
                          <button
                            onClick={() => deleteField(field.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {formFields.length > 0 && (
                    <button
                      style={{
                        backgroundColor: formConfig.buttonColor,
                        color: formConfig.buttonTextColor,
                      }}
                      className="w-full mt-6 py-3 rounded-lg font-medium text-sm"
                    >
                      {formConfig.buttonText}
                    </button>
                  )}

                  {formConfig.showFooter && (
                    <p className="text-center text-xs text-gray-500 mt-8">
                      {formConfig.footerText}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Vue Réponses */}
        {currentView === "reponses" && (
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Réponses au formulaire</h2>
                  <p className="text-sm text-gray-500 mt-1">{mockResponses.length} réponse(s) reçue(s)</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Exporter (CSV)
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Nom</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockResponses.length > 0 ? (
                      mockResponses.map((response) => (
                        <tr key={response.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{response.nom}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{response.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{response.date}</td>
                          <td className="px-6 py-4 text-sm">
                            <button className="text-blue-600 hover:text-blue-800">Voir détails</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-20 text-center text-gray-500 text-sm">
                          Aucune réponse pour le moment
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Vue Publication */}
        {currentView === "publication" && (
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Publier votre formulaire</h2>
                <p className="text-sm text-gray-500">Partagez votre formulaire via un lien ou un QR code</p>
              </div>

              <div className="space-y-6">
                {/* Lien de partage */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Lien de partage</h3>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value="https://tinydock.com/forms/abc123xyz"
                      readOnly
                      className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50"
                    />
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Copier
                    </button>
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">QR Code</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-4">
                        Téléchargez le QR code pour l'imprimer ou le partager
                      </p>
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        Télécharger le QR code
                      </button>
                    </div>
                  </div>
                </div>

                {/* Statut de publication */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Statut</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Formulaire publié et actif</span>
                    </div>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Désactiver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}