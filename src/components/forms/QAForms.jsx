import FormsHeader from "./FormsHeader";
import FormsTable from "./FormsTable";
import FormsStats from "./FormsStats";
import FormsFilters from "./FormsFilters";
import { useMemo, useState, useEffect } from "react";
import { getForms, getFormVersions } from "../../api/formsApi";
import { publishBuilder, createDraft } from "../../api/builderApi";
import { toast } from "sonner";
import VersionHistoryModal from "./VersionHistoryModal";

export default function QAForms({
  onCreate,
  onEdit,
  onDuplicate
}) {

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("updated");
  const [forms, setForms] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyVersions, setHistoryVersions] = useState([]);
  const [historyFormName, setHistoryFormName] = useState("");

  const loadForms = async () => {

    try {

        const result = await getForms();

        const mappedForms = result.forms.map(form => ({

            id: form.form_id,
            publicId: form.public_id,
            code: form.code,
            name: form.name,

            status: form.status,
            statusCode: form.status_code,

            version: form.version,
            sections: form.sections,
            questions: form.questions,

            updated: new Date(
                form.updated_at
            ).toLocaleDateString()

        }));

        setForms(mappedForms);

    }

    catch (ex) {
        console.error(ex);
    }

  };

  useEffect(() => {

    loadForms();

  }, []);

  const handlePublish = async (publicId) => {

    try {
        await publishBuilder(publicId);
        await loadForms();
        toast.success(
            "Form published successfully."
        );
    }

    catch (ex) {
        console.error(ex);
    }
  };

  const handleCreateDraft = async (publicId) => {

    try {
        const result = await createDraft(publicId);
        console.log(result);
        await loadForms();
        toast.success(
            result.message
        );
    }

    catch (ex) {
        console.error(ex);
        toast.error(
            ex.message
        );
    }
  };

  const handleHistory = async (publicId, formName) => {
    try {
        const result = await getFormVersions(
            publicId
        );
        setHistoryVersions(
            result.versions
        );
        setHistoryFormName(
            formName
        );
        setHistoryOpen(true);
    }

    catch (ex) {
        console.error(ex);
    }

  };

  const filteredForms = useMemo(() => {

    let data = [...forms];

    // Estado
    if (selectedStatus) {
        data = data.filter(
            form =>
                form.status === selectedStatus
        );
    }

    // Búsqueda
    if (search.trim()) {
        data = data.filter(
            form =>
                form.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );
    }

    // Orden
    switch (sort) {
        case "az":

            data.sort(
                (a,b)=>
                    a.name.localeCompare(b.name)
            );

            break;

        case "za":

            data.sort(
                (a,b)=>
                    b.name.localeCompare(a.name)
            );

            break;

        case "version":

            data.sort(
                (a,b)=>
                    b.version-a.version
            );

            break;

        default:

            break;

    }

    return data;

  }, [
    forms,
    selectedStatus,
    search,
    sort
  ]);

  return (
    <div className="space-y-6">
      <FormsHeader
        onCreate={onCreate}
      />

      <FormsStats
        forms={forms}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
      />

      <FormsFilters
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        onClear={() => {

            setSearch("");
            setSort("updated");
            setSelectedStatus(null);

        }}

      />

      <FormsTable
        forms={filteredForms}
        onEdit={onEdit}
        onDuplicate={onDuplicate}
        onPublish={handlePublish}
        onCreateDraft={handleCreateDraft}
        onHistory={handleHistory}
      />

      <VersionHistoryModal
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        formName={historyFormName}
        versions={historyVersions}
      />
    </div>

  );
}