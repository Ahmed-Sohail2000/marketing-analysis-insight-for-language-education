"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AtRiskStudent } from "@/types/analysis";

interface AtRiskStudentsTableProps {
  students: AtRiskStudent[];
}

const AtRiskStudentsTable: React.FC<AtRiskStudentsTableProps> = ({ students }) => {
  if (!students || students.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>At-Risk Students</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Risk Factors</TableHead>
                <TableHead>Recommended Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell className="font-medium">{student.studentId}</TableCell>
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell>{student.riskFactors.join(", ")}</TableCell>
                  <TableCell>{student.recommendedAction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AtRiskStudentsTable;